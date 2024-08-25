import Image from 'next/image';
import Link from 'next/link';
import styles from './ChatIcon.module.css';

export default function ChatIcon() {
  return (
    <Link href="/chat">
      <div className={styles.chatIconContainer}>
        <Image src="/images/chat-icon.png" alt="Chat Icon" width={50} height={50} />
      </div>
    </Link>
  );
}