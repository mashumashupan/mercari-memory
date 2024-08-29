"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Next.jsのuseRouterを使用
import Stories from 'react-insta-stories';
import styles from './Stories.module.css';

const storiesContent = [
  {
    url: '/videos/user1-video.mp4',  // ビデオをpublicフォルダから読み込む
    type: 'video',
    duration: 5000, // 動画の再生時間（動画の長さが優先されます）
    header: {
      heading: 'User 1',
      subheading: 'Posted 5h ago',
      profileImage: '/images/user2-icon.png',  // プロフィール画像もpublicから読み込み
    },
  },
  {
    url: '/videos/user2-video.mp4',
    type: 'video',
    duration: 5000,
    header: {
      heading: 'User 2',
      subheading: 'Posted 3h ago',
      profileImage: '/images/user3-icon.png',
    },
  },
  {
    url: '/videos/user3-video.mp4',
    type: 'video',
    duration: 5000,
    header: {
      heading: 'User 3',
      subheading: 'Posted 1h ago',
      profileImage: '/images/user4-icon.png',
    },
  },
  {
    url: '/videos/user4-video.mp4',
    type: 'video',
    duration: 5000,
    header: {
      heading: 'User 4',
      subheading: 'Posted 1h ago',
      profileImage: '/images/user4-icon.png',
    },
  },
  {
    url: '/videos/user5-video.mp4',
    type: 'video',
    duration: 5000,
    header: {
      heading: 'User 5',
      subheading: 'Posted 1h ago',
      profileImage: '/images/user4-icon.png',
    },
  },
  {
    url: '/videos/user1-video.mp4',
    type: 'video',
    duration: 5000,
    header: {
      heading: 'User 6',
      subheading: 'Posted 1h ago',
      profileImage: '/images/user4-icon.png',
    },
  },
];

const StoriesPage = () => {
  const router = useRouter(); // ルーターを初期化
  const [currentIndex, setCurrentIndex] = useState(0); // 現在のストーリーインデックスを追跡
  const [key, setKey] = useState(0); // 再描画を強制するためのキー

  useEffect(() => {
    setKey((prevKey) => prevKey + 1); // インデックスが変更されたら再描画をトリガー
  }, [currentIndex]);

  const handleAllStoriesEnd = () => {
    router.push('/'); // ホーム画面にリダイレクト
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex < storiesContent.length ? nextIndex : prevIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      const previousIndex = prevIndex - 1;
      return previousIndex >= 0 ? previousIndex : prevIndex;
    });
  };

  return (
    <div className={styles.container}>
      <Stories
        key={key} // 再描画を強制するためのキー
        stories={storiesContent}
        defaultInterval={1500}
        width="100vw"  // 幅をビューポート全体に設定
        height="100vh" // 高さをビューポート全体に設定
        onAllStoriesEnd={handleAllStoriesEnd} // すべてのストーリーが終了したら実行
        currentIndex={currentIndex} // 現在のインデックスを設定
        onPrevious={handlePrevious} // 前のストーリーに戻る機能
        onNext={handleNext} // 次のストーリーに進む機能
        keyboardNavigation // キーボードでのナビゲーションを有効化
        loop={false} // ループを無効化（最後のストーリーの後に停止）
      />
    </div>
  );
};

export default StoriesPage;
