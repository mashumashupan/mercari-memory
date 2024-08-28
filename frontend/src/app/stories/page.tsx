"use client";

import React from 'react';
import Stories from 'react-insta-stories';
import styles from './Stories.module.css';

const storiesContent = [
  {
    url: '/videos/user2-video.mp4',  // ビデオをpublicフォルダから読み込む
    type: 'video',
    duration: 5000, // 動画の再生時間（動画の長さが優先されます）
    header: {
      heading: 'User 1',
      subheading: 'Posted 5h ago',
      profileImage: '/images/user2-icon.jpg',  // プロフィール画像もpublicから読み込み
    },
  },
  {
    url: '/videos/user2-video.mp4',  // ビデオをpublicフォルダから読み込む
    type: 'video',
    duration: 5000, // 動画の再生時間（動画の長さが優先されます）
    header: {
      heading: 'User 2',
      subheading: 'Posted 3h ago',
      profileImage: '/images/user3-icon.jpg',
    },
  },
  {
    url: '/videos/user2-video.mp4',  // ビデオをpublicフォルダから読み込む
    type: 'video',
    duration: 5000, // 動画の再生時間（動画の長さが優先されます）
    header: {
      heading: 'User 3',
      subheading: 'Posted 1h ago',
      profileImage: '/images/user4-icon.jpg',
    },
  },
];

const StoriesPage = () => {
  return (
    <div className={styles.container}>
      <Stories
        stories={storiesContent}
        defaultInterval={1500}
        width="100vw"  // 幅をビューポート全体に設定
        height="100vh" // 高さをビューポート全体に設定
      />
    </div>
  );
};

export default StoriesPage;
