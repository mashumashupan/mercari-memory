import React from 'react';
import Link from 'next/link'; // Linkコンポーネントをインポート
import styles from './Footer.module.css';

interface FooterItem {
  iconSrc: string;
  label: string;
  href: string;  // リンク先を指定するためのプロパティを追加
  notificationCount?: number;
}

const Footer: React.FC = () => {
  const footerItems: FooterItem[] = [
    { iconSrc: '/images/home-icon.png', label: 'Home', href: '/' }, // ホームボタンは / に遷移
    { iconSrc: '/images/favorites-icon.png', label: 'Favorites', href: '/favorites' }, // 必要に応じて適切なパスに修正
    { iconSrc: '/images/sell-icon.png', label: 'Sell', href: '/chat' }, // Sellボタンは /chat に遷移
    { iconSrc: '/images/inbox-icon.png', label: 'Inbox', href: '/inbox' }, // 必要に応じて適切なパスに修正
    { iconSrc: '/images/profile-icon.png', label: 'Profile', href: '/profile' } // 必要に応じて適切なパスに修正
  ];

  return (
    <footer className={styles.footer}>
      {footerItems.map((item, index) => (
        <Link href={item.href} key={index}>
          <div className={styles.iconContainer}>
            <img src={item.iconSrc} alt={item.label} className={styles.iconImage} />
            <span className={styles.textSm}>{item.label}</span>
            {item.notificationCount && item.notificationCount > 0 && (
              <div className={styles.notificationBadge}>
                {item.notificationCount}
              </div>
            )}
          </div>
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
