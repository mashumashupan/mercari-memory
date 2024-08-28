import React from 'react';
import Link from 'next/link'; // Next.jsのLinkコンポーネントをインポート
import styles from './Story.module.css';

interface StoryProps {
  stories: Array<{ name: string; image: string }>;
}

const Story: React.FC<StoryProps> = ({ stories }) => {
  return (
    <div className={styles.storyContainer}>
      {stories.map((story, index) => (
        <Link href="/stories" key={index} passHref> 
          <div className={styles.storyItem}>
            <img src={story.image} alt={story.name} />
            <p className="text-center text-sm mt-2">{story.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Story;
