import Link from 'next/link';
import Image from 'next/image';

export default function ChatIcon() {
  return (
    <Link href="/chat">
      <Image 
        src="/images/chat-icon.png" 
        alt="チャットアイコン" 
        width={50}  // 画像の幅を指定
        height={50}  // 画像の高さを指定
      />
    </Link>
  );
}
