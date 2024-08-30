"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './listing.module.css';
import { useChat } from '@/store/use-chat-store';
import { useEffect } from 'react';
import apiFetch from '@/utils/api';
import { ProductsJsonType } from '@/app/page';
import { useRouter } from 'next/navigation';

export default function SellItemForm() { // ここにuseHistory 
    // const [title, setTitle] = useState<string>(''); // 画面に表示するコンポーネントを取り出す
    // const [description, setDescription] = useState<string>('');
    // const [price, setPrice] = useState<string>('');
    const { title, description, price, setPrice } = useChat();
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        return () => {
            // セッションストレージから画像データを取得
            const imageSrc = sessionStorage.getItem('capturedImage');
            if (imageSrc) {
                setCapturedImage(imageSrc);
            }
        };
    }, []);

    const listing = async () => {
        try {
            const chatResponse = await apiFetch<ProductsJsonType>(`/api/create-product`, {
                method: 'POST',
                body: JSON.stringify({
                    name: title,
                    description: description,
                    price: price,
                    image: capturedImage
                })
            })
            router.push('/listingCompleted');
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    }

    return (
        <div className={styles['sell-item-form']}>
            <header className={styles['header']}>
                <Link href="/">
                    <button className={styles['close-button']}>&times;</button>
                </Link>
                <h1 className={styles['h1']}>Sell an item</h1>
            </header>

            <div className={styles['content']}>
                <div className={styles['photo-grid']}>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className={`${styles['photo-placeholder']} ${i === 0 ? styles.active : ''}`}>
                            {i === 0 && (
                                <div className={styles['photo-placeholder-content']}>
                                    <Image
                                        src={capturedImage ?? "/images/photo-camera-icon.png"}
                                        alt="Camera Icon"
                                        width={50}
                                        height={50}
                                        className={styles['camera-icon']}
                                    />
                                    <p>Add up to<br />12 photos</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <section className={styles['description-section']}>
                    <h2 className={styles['h2']}>Title</h2>
                    <input
                        className={styles['input-field']}

                        value={title}

                        maxLength={80} />
                </section>
                <section className={styles['description-section']}>
                    <h2 className={styles['h2']}>Description</h2>
                    <textarea
                        className={styles['textarea-field']}

                        value={description}

                        maxLength={100000}
                        rows={10} />
                </section>


                <section className={styles['pricing-section']}>
                    <h2 className={styles['h2']}>Pricing</h2>
                    <div className={styles['price-input-container']}>
                        <span className={styles['currency-symbol']}>$</span>
                        <input
                            className={styles['price-input']}
                            onChange={(e) => {
                                console.log(e.target.value);
                                // 数字のみを受け付ける、正規表現
                                if (!/^\d+$/.test(e.target.value)) {
                                    setPrice(Number(e.target.value)); //テキストを読み取り、数値に変換
                                }
                            }}
                            value={price}
                        />
                    </div>
                </section>

                <div className={styles['form-actions']}>
                    {/* <Link href="/listingCompleted"> */}
                    <button className={styles['list-button']} onClick={(e) => { listing() }}>
                        List</button>
                    {/* </Link> */}
                </div>
            </div>
        </div>
    );
}
