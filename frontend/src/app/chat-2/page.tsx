"use client";

import { useState, useEffect, useCallback } from 'react';
// import { useHistory } from 'react-router-dom';
import Link from 'next/link';
import styles from './Chat-2.module.css';
import apiFetch from '@/utils/api';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { useChat } from "@/store/use-chat-store";
import Image from 'next/image';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatResponse {
  response: string;
}

interface ChatResponseJSON {
  question?: string;
  title?: string;
  description?: string;
  price?: number;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Please take a photo.", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState('');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isChatEnd, setIsChatEnd] = useState(false);
  //　画面遷移のためのrouter
  const router = useRouter();
  // 状態を更新する関数、use-chat-store.tsxから取り出す
  const { setTitle, setDescription, setPrice } = useChat();

  useEffect(() => {
    // ローカルストレージからセッションIDを取得
    let existingSessionId = localStorage.getItem('sessionId');
    if (!existingSessionId) {
      // セッションIDが存在しない場合は新しく生成して保存
      existingSessionId = uuidv4();
      localStorage.setItem('sessionId', existingSessionId);
    }
    setSessionId(existingSessionId);

    return () => {
      // セッションストレージから画像データを取得
      const imageSrc = sessionStorage.getItem('capturedImage');
      if (imageSrc) {
        setCapturedImage(imageSrc);
        startChat(imageSrc, existingSessionId); // 画像を送信
      }
    };
  }, []);

  // APIからJSONを取ってきて、インターフェースの型に合わせて返す
  const sendChat = async (api: 'chat' | 'chat-start', formData: FormData): Promise<ChatResponseJSON> => {
    const chatResponse: ChatResponse = await apiFetch(`/api/${api}`, {
      method: 'POST',
      body: formData
    });
    try {
      // priceがnumberになるようにJSONをパース
      const json = JSON.parse(chatResponse.response);
      return {
        question: json?.question,
        title: json?.title,
        description: json?.description,
        price: json?.price
      } as ChatResponseJSON; // priceがnumberになる
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return {};
    }
  };

  const startChat = useCallback(async (image: string, sessionId: string) => {
    const formData = new FormData();
    formData.append('session_id', sessionId);
    formData.append('base64_image', image);

    try {
      const responseJSON: ChatResponseJSON = await sendChat('chat-start', formData);

      const botResponse: Message = { id: messages.length + 1, text: responseJSON.question ?? '', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  }, [messages.length]);

  const handleSendMessage = async () => {
    if (inputText.trim() !== '' && sessionId) {
      const newMessage: Message = { id: messages.length + 1, text: inputText, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputText('');

      const formData = new FormData();
      formData.append('session_id', sessionId);
      formData.append('chat_message', inputText);

      try {
        const responseJSON: ChatResponseJSON = await sendChat('chat', formData);
        // タイトルがある場合は最終出力
        if (responseJSON.title) {
          setIsChatEnd(true);
          setTitle(responseJSON.title); // ボタンを押すと次の画面に遷移するようにしたからコメントアウト
          setDescription(responseJSON.description ?? '');
          setPrice(responseJSON.price ?? 0);
          // ここに画面遷移処理を追加
          // router.push('/listing');
          const botResponse: Message = { id: messages.length + 2, text: 'overview is ready!!!', sender: 'bot' };
          setMessages(prevMessages => [...prevMessages, botResponse]);
        }
        // それ以外は通常の返答
        else {
          // ここにチャットの更新処理
          const botResponse: Message = { id: messages.length + 2, text: responseJSON.question ?? '', sender: 'bot' };
          setMessages(prevMessages => [...prevMessages, botResponse]);
        }
        // const history = useHistory();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  //　リンクで画面遷移する
  // const gotoListing = () => {
  //   router.push('/listing');
  // }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <Link href="/">
          <button className={styles.backButton}>＜</button>
        </Link>
        Mercari Chat
      </div>
      <div className={styles.chatMessages} id="chatMessages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.chatMessage} ${message.sender === 'user' ? styles.chatEnd : styles.chatStart}`}
          >
            {message.sender === 'bot' ? (
              <div className={styles.botMessageContainer}>
                <div className={styles.chatIcon}></div>
                <div className={styles.messageContent}>
                  <div className={styles.chatBubble}>{message.text}</div>
                  {message.text === "Please take a photo." && (
                    <div>
                      <Link href="/photo">
                        <div className={styles.cameraIcon}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z" />
                            <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                          </svg>
                        </div>
                      </Link>
                      {/* // TODO: listingに持って行く */}
                      {capturedImage && (
                        <div className={styles.capturedImageContainer}>
                          <img src={capturedImage} alt="Captured" className={styles.capturedImage} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.userMessageContainer}>
                <div className={styles.chatBubble}>{message.text}</div>
              </div>
            )}
          </div>
        ))}

        {/* // チャットが終了した場合アイコン表示 */}
        {isChatEnd && (
          <div className={styles.userMessageContainer}>
            <Link href="/listing">
              <div className={styles.chatIconContainer}>
                <Image src="/images/chat-icon.png" alt="Chat Icon" width={150} height={150} />
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className={styles.chatInput}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleInputKeyPress}
          placeholder="Enter text"
        />
        <button onClick={handleSendMessage}>send</button>
      </div>
    </div>
  );
}
