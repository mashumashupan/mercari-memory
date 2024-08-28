"use client";

import Image from 'next/image';
import Link from 'next/link';
import styles from './ChatIcon.module.css';

export default function ChatIcon() {
  return (
    <Link href="/chat"> {/* Linkコンポーネントで囲む */}
      <div className={styles.chatIconContainer}>
        <div>
          <Image src="/images/chat-icon.png" alt="Chat Icon" width={150} height={150} />
        </div>
      </div>
    </Link>
  );
}

