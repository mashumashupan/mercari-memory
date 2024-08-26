"use client";

import React, { useRef, useCallback, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from './Photo.module.css';

// User型の定義
interface User {
  id: string;
  name: string;
}


// ユーザー情報を読み込むカスタムフック
const useUser = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return { user };
};

function PhotoPage() {
  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user'); // カメラのモード（フロント/リア）
  const { user } = useUser(); // ユーザー情報の取得

  // 画像キャプチャとページ遷移の処理
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      sessionStorage.setItem('capturedImage', imageSrc);
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

  const flipCamera = () => {
    setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={() => router.push('/chat')}>
        ×
      </button>
      {user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
        </div>
      ) : (
        <div>
          <p>No user information available.</p>
        </div>
      )}
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

// Dynamic import to prevent SSR issues
const DynamicPhotoPage = dynamic(() => Promise.resolve(PhotoPage), { ssr: false });

export default DynamicPhotoPage;
