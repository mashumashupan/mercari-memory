"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Stories from 'react-insta-stories';
import styles from './Stories.module.css';

// カスタムStory型の定義
type Story = {
  url: string;
  type: 'video' | 'image';
  duration: number;
  header: {
    heading: string;
    subheading: string;
    profileImage: string;
  };
};

// ストーリーのコンテンツを定義
const storiesContent: Story[] = [
  {
    url: '/videos/user1-video.mp4',
    type: 'video',
    duration: 5000,
    header: {
      heading: 'User 1',
      subheading: 'Posted 5h ago',
      profileImage: '/images/user1-icon.png',
    },
  },
  {
    url: '/videos/user2-video.mp4',
    type: 'video',
    duration: 5000,
    header: {
      heading: 'User 2',
      subheading: 'Posted 3h ago',
      profileImage: '/images/user2-icon.png',
    },
  },
  {
    url: '/videos/user3-video.mp4',
    type: 'video',
    duration: 5000,
    header: {
      heading: 'User 3',
      subheading: 'Posted 1h ago',
      profileImage: '/images/user3-icon.png',
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
      profileImage: '/images/user5-icon.png',
    },
  },
  {
    url: '/videos/user6-video.mp4',
    type: 'video',
    duration: 5000,
    header: {
      heading: 'User 6',
      subheading: 'Posted 1h ago',
      profileImage: '/images/user6-icon.png',
    },
  },
];

const StoriesPage = () => {
  const router = useRouter();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handleAllStoriesEnd = () => {
    router.push('/');
  };

  const handleStoryChange = (storyIndex: number) => {
    setCurrentStoryIndex(storyIndex);
  };

  const storiesProps: {
    stories: any[];
    defaultInterval: number;
    width: string;
    height: string;
    onAllStoriesEnd: () => void;
    storyContainerStyles: { background: string };
    loop: boolean;
    keyboardNavigation: boolean;
    currentIndex: number;
    onStoryChange: (storyIndex: number) => void;
  } = {
    stories: storiesContent,
    defaultInterval: 1500,
    width: '100vw',
    height: '100vh',
    onAllStoriesEnd: handleAllStoriesEnd,
    storyContainerStyles: { background: 'black' },
    loop: false,
    keyboardNavigation: true,
    currentIndex: currentStoryIndex,
    onStoryChange: handleStoryChange,
  };

  return (
    <div className={styles.container}>
      <Stories {...storiesProps} />
    </div>
  );
};

export default StoriesPage;