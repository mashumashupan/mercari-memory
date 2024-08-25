"use client";

import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { useRouter } from 'next/navigation';
import styles from './Photo.module.css';

export default function PhotoPage() {
  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user'); // カメラのモード（フロント/リア）

  // 画像キャプチャとページ遷移の処理
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // 画像データを sessionStorage に保存
      sessionStorage.setItem('capturedImage', imageSrc);
      // プレビュー用のページに遷移
      router.push('/photo/preview');
    }
  }, [webcamRef, router]);

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        router.push(`/photo/preview?image=${encodeURIComponent(base64data)}`);
      };
      reader.readAsDataURL(file);
    }
  };

  // カメラのフリップ処理
  const flipCamera = () => {
    setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.closeButton} 
        onClick={() => router.push('/chat')}>
        ×
      </button>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className={styles.webcam}
        videoConstraints={{ facingMode }}  // カメラの向きを指定
      />
      <div className={styles.controls}>
        <label className={styles.controlButton}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={selectImage} 
            className={styles.fileInput} 
          />
          <img src="/images/library-icon.png" alt="Library" />
          <span>Library</span>
        </label>
        <button className={styles.controlButton} onClick={capture}>
          <img src="/images/camera-icon.png" alt="Capture" />
          <span>Capture</span>
        </button>
        <button className={styles.controlButton} onClick={flipCamera}>
          <img src="/images/flip-icon.png" alt="Flip Camera" />
          <span>Flip</span>
        </button>
      </div>
    </div>
  );
}
