"use client";

import React from 'react';
import { useRouter } from 'next/router';
import styles from './Preview-2.module.css';

export default function PhotoPreviewPage() {
  const router = useRouter();
  const { image } = router.query;  // 修正: router.queryを使用してクエリパラメータを取得
  const imageSrc = typeof image === 'string' ? image : '';

  // 画像がない場合は/photoに戻る
  if (!imageSrc) {
    router.push('/photo');
    return null;
  }

  const handleUsePhoto = () => {
    sessionStorage.setItem('selectedImage', imageSrc);
    router.push('/chat-2'); // /chat-2ページに遷移
  };

  const handleEdit = () => {
    console.log("Editing photo...");
    // 画像編集機能をここに実装
  };

  const handleRetake = () => {
    router.push('/photo'); // /photoページに戻る
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={() => router.push('/chat')}>×</button>
      <img src={imageSrc} alt="Preview" className={styles.previewImage} />
      <div className={styles.controls}>
        <button className={styles.controlButton} onClick={handleEdit}>
          <img src="/images/edit-icon.png" alt="Edit" />
          <span className={styles.controlButtonText}>Edit</span>
        </button>
        <button className={styles.controlButton} onClick={handleRetake}>
          <img src="/images/retake-icon.png" alt="Retake" />
          <span className={styles.controlButtonText}>Retake</span>
        </button>
        <button className={styles.usePhotoButton} onClick={handleUsePhoto}>
          <img src="/images/use-photo-icon.png" alt="Use Photo" />
          <span className={styles.usePhotoButtonText}>Use Photo</span>
        </button>
      </div>
    </div>
  );
}
