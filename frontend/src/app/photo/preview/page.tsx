"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './Preview.module.css';

export default function PhotoPreviewPage() {
  const router = useRouter();

  // sessionStorageから画像データを取得
  const imageSrc = sessionStorage.getItem('capturedImage');

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
    // 画像編集用のロジックをここに実装
    console.log("Editing photo...");
    // 画像編集機能を実装して、終了後に再度プレビュー画面に戻るか、別の処理を行う
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
        <button className={`${styles.usePhotoButton} ${styles.usePhotoButton}`} onClick={handleUsePhoto}>
          <img src="/images/use-photo-icon.png" alt="Use Photo" />
          <span className={styles.usePhotoButtonText}>Use Photo</span>
        </button>
      </div>
    </div>
  );
}
