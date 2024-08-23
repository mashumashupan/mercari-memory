package main

import (
	"os"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

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

func main() {

	dsn := os.Getenv("DSN")
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("データベース接続に失敗しました")
	}
	db = database

	db.AutoMigrate(&Products{})

	r := gin.Default()

	r.GET("/api/products", func(c *gin.Context) {

		// 小説に紐づくエピソードを取得
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
	})
	r.Run()
}
