"use client";

import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { useRouter } from 'next/navigation';
import styles from './Photo.module.css';

export default function PhotoPage() {
  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // ここで画像データを保存したり、別のページに渡したりできます
      console.log(imageSrc);
      // 必要に応じて画像データを次のページに渡す
      router.push('/result'); // 結果ページへ遷移（ページが存在する場合）
    }
  }, [webcamRef, router]);

  return (
    <div className={styles.container}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className={styles.webcam}
      />
      <div className={styles.controls}>
        <button className={styles.button} onClick={() => router.back()}>Cancel</button>
        <button className={styles.button} onClick={capture}>Use Photo</button>
      </div>
    </div>
  );
}

  