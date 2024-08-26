package main

import (
	"context"
	"database/sql"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	openai "github.com/sashabaranov/go-openai"

	"github.com/gin-contrib/cors"
	_ "github.com/mashumashupan/mercarius_clone/docs" // docs をインポートして Swag のドキュメントを読み込む
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ssm"
)

// @BasePath /v1

// データベース用
type Products struct {
	Id    uint    `gorm:"primaryKey"`
	Name  string  `gorm:"type:varchar(255)"`
	Price float64 `gorm:"type:decimal(10,2)"`
	Image string  `gorm:"type:varchar(255)"`
}

// APIのレスポンス用
type ProductsJson struct {
	Name  string  `json:"name"`
	Price float64 `json:"price"`
	Image string  `json:"image"`
}

var db *gorm.DB

// 最初に送るメッセージ
var systemMessage = openai.ChatCompletionMessage{
	Role: openai.ChatMessageRoleSystem,
	Content: `フリマアプリの出品文章を物語性ある感じで書いてくれるチャットボットを作りたい．
対話定式で，「購入時何が良いと思ったのか」「その物にまつわるエピソード」「なぜ手放すのか（ネガティブな返答が来たらポジションに変換）」などの質問をして，魅力的な商品紹介を作るサービスです。
「面白いアイデアですね！」のようなサービスに対するリアクションは省いて．
「まずは、出品する商品についていくつか質問をさせていただきます。これらの質問にお答えいただければ、その回答を元に物語性のある商品説明文を作成します。」のようなのもなく端的に「いくつか質問させてください。」のみですぐに質問に移る．
商品名が特定できたら「〜という商品で合っていますか？」「〜という商品ですね」などを言って．商品名が分からない時はユーザーに「商品名は分かりますか？」と聞いて．ユーザーもわからない時は，商品概要が分かる名前を最後にタイトルに付けて．
出力はJSON形式にして,questionに質問を入れて,最終出力だけは，商品タイトル，キャッチコピー，魅力的な商品紹介，関連タグにそれぞれ結果を出してください．
「ありがとうございます。それでは、ご提供いただいた情報を基に商品説明文を作成します。」のような前置きはいらない．ハッシュタグに #中古品 はいらない．また,1行目に最終出力なのか,そうでないのかの符号を付けて.
出品のフローを試したい。質問を考えた上で1つずつ提示して。その後こちらが答えるので、いくつかのやり取りの後、こちらの回答を踏まえて商品説明となる物語感ある文章を作成して。まずは商品画像が送られてきます。その後質問をしてください。`,
}

// セッション毎にやり取りを保存するMap
// TODO: 本来はキャッシュサーバーなどに保存する
var chatMap = map[string][]openai.ChatCompletionMessage{}

// ChatGPTのクライアント
// main関数で初期化
var client *openai.Client

var isLocal = os.Getenv("IS_LOCAL") == "true"
var ssmPrefix = "/mercarius/"

func main() {
	sess, err := session.NewSessionWithOptions(session.Options{
		Config:  aws.Config{Region: aws.String("ap-northeast-1")},
		Profile: "default",
	})
	var svc *ssm.SSM

	if err != nil {
		if isLocal {
			fmt.Printf("ローカル環境で実行しているため、AWS SSM に接続できません")
		} else {
			panic("セッション作成に失敗しました")
		}
	} else {
		svc = ssm.New(sess)
	}

	dsn := getParam(svc, "DSN")
	dbName := getParam(svc, "DB_NAME")
	dsnParam := getParam(svc, "DSN_PARAM")
	// MySQLに接続
	database, err := sql.Open("mysql", dsn)
	if err != nil {
		panic("データベース接続に失敗しました")
	}

	// データベースがない場合は作成
	_, err = database.Exec(fmt.Sprintf("CREATE DATABASE IF NOT EXISTS %s;", dbName))
	if err != nil {
		panic("データベース作成に失敗しました")
	}

	// データベースに接続
	db, err = gorm.Open(mysql.Open(dsn+dbName+dsnParam), &gorm.Config{})
	if err != nil {
		panic("データベース接続に失敗しました")
	}

	db.AutoMigrate(&Products{}) // テーブル作成

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// APIキーを読み込む
	apiKey := getParam(svc, "API_KEY")
	client = openai.NewClient(apiKey) // API key

	v1 := r.Group("/v1")
	{
		// Swagger のエンドポイントをセットアップ
		r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

		// 商品一覧取得API
		v1.GET("/api/products", products)

		// 最初の画像送信用チャットAPI
		v1.POST("/api/chat-start", chatStart)

		// チャットAPI
		v1.POST("/api/chat", chat)
	}

	r.Run()
}

func getParam(svc *ssm.SSM, name string) string {
	if isLocal {
		return os.Getenv(name)
	} else {
		if svc == nil {
			fmt.Printf("SSMが設定されていないため、パラメータ %s を取得できません", name)
			return ""
		}
		res, err := svc.GetParameter(&ssm.GetParameterInput{
			Name:           aws.String(ssmPrefix + name),
			WithDecryption: aws.Bool(true),
		})
		if err != nil {
			fmt.Printf("パラメータ %s の取得に失敗しました: %v", name, err)
			return ""
		}
		return *res.Parameter.Value
	}
}

// products godoc
// @Summary 商品一覧取得API
// @Description 商品一覧を取得するAPI
// @ID get-products
// @Produce json
// @Success 200 {array} ProductsJson
// @Router /api/products [get]
func products(c *gin.Context) {

	// データベースから商品一覧を取得
	products := []Products{}
	db.Find(&products)

	// JSONに変換
	productsJson := []ProductsJson{}
	for _, e := range products {
		productsJson = append(productsJson, ProductsJson{
			Name:  e.Name,
			Price: e.Price,
			Image: e.Image,
		})
	}

	// JSONを返す
	c.JSON(200, productsJson)
}

// chatStart godoc
// @Summary 最初の画像送信用チャットAPI
// @Description 最初の画像を送信してチャットを開始するAPI
// @ID post-chat-start
// @Accept multipart/form-data
// @Param session_id formData string true "セッションID"
// @Param base64_image formData string true "画像データ"
// @Produce json
// @Success 200 {string} response
// @Router /api/chat-start [post]
func chatStart(c *gin.Context) {
	sessionId := c.PostForm("session_id") // セッション毎にIDを振る

	// 画像データを受信
	base64Image := c.PostForm("base64_image")

	// ChatGPTに画像データとsystemのメッセージを送信するための，メッセージを作成
	chat := []openai.ChatCompletionMessage{
		systemMessage,
		{
			Role: openai.ChatMessageRoleUser,
			MultiContent: []openai.ChatMessagePart{
				{
					Type: openai.ChatMessagePartTypeImageURL,
					ImageURL: &openai.ChatMessageImageURL{
						URL:    base64Image,
						Detail: openai.ImageURLDetailAuto,
					},
				},
			},
		},
	}

	// ChatGPTにメッセージを送信し，返答を取得
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model:    openai.GPT4o,
			Messages: chat,
		},
	)

	if err != nil {
		text := fmt.Sprintf("ChatCompletion error: %v\n", err)
		c.JSON(500, gin.H{
			"error": text,
		})
		return
	}

	// 返答をセッションIDでMapに保存
	// 返答を追加
	chat = append(chat, resp.Choices[0].Message)
	// セッションIDでMapに保存
	chatMap[sessionId] = chat

	// 返答をクライアントに返す
	c.JSON(200, gin.H{
		"response": resp.Choices[0].Message.Content,
	})
}

// chat godoc
// @Summary チャットAPI
// @Description チャットを行うAPI
// @ID post-chat
// @Accept multipart/form-data
// @Param session_id formData string true "セッションID"
// @Param chat_message formData string true "チャットメッセージ"
// @Produce json
// @Success 200 {string} response
// @Router /api/chat [post]
func chat(c *gin.Context) {
	sessionId := c.PostForm("session_id") // セッション毎にIDを振る
	message := c.PostForm("chat_message")

	// セッションIDでMapから現在のやり取りのを取得
	chat, ok := chatMap[sessionId]
	if !ok {
		// セッションIDがない場合は初回のため最初のメッセージを作る
		chat = []openai.ChatCompletionMessage{
			// システムメッセージ
			systemMessage,
		}
	}

	// クライアントメッセージを追加
	chat = append(chat, openai.ChatCompletionMessage{
		Role:    openai.ChatMessageRoleUser,
		Content: message,
	})

	// ChatGPTにメッセージを送信し，返答を取得
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model:    openai.GPT4o,
			Messages: chat,
		},
	)

	if err != nil {
		text := fmt.Sprintf("ChatCompletion error: %v\n", err)
		c.JSON(500, gin.H{
			"error": text,
		})
		return
	}

	// 返答を追加
	chat = append(chat, resp.Choices[0].Message)
	// セッションIDでMapに保存
	chatMap[sessionId] = chat

	// 返答をクライアントに返す
	c.JSON(200, gin.H{
		"response": resp.Choices[0].Message.Content,
	})
}
