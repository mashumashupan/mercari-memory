"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Chat.module.css';
import apiFetch from '@/utils/api';
import { randomUUID } from 'crypto';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Please take a photo.", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState('');
  // const sessionId = randomUUID();

  const handleSendMessage = async () => {
    if (inputText.trim() !== '') {
      const newMessage: Message = { id: messages.length + 1, text: inputText, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputText('');

      // バックエンドのchatGPTとやり取り
      // const responseText: string = await apiFetch('/api/chat', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     session_id: sessionId,
      //     chat_message: inputText
      //   }),
      // });

      // バックエンドのchatGPTからの返答を表示
      // const botResponse: Message = { id: messages.length + 2, text: responseText, sender: 'bot' };
      // setMessages(prevMessages => [...prevMessages, botResponse]);
      // Simulate a bot response
      setTimeout(() => {
        const botResponse: Message = { id: messages.length + 2, text: "Thank you for your message. How else can I assist you?", sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  const handleInputKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await handleSendMessage();
    }
  };

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
                    <Link href="/photo">
                      <div className={styles.cameraIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z" />
                          <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                        </svg>
                      </div>
                    </Link>
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
