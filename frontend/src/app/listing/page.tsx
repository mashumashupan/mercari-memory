"use client";

import React, { useState } from 'react';
import { Camera, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import styles from './listing.module.css';

export default function SellItemForm() {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [hashtags, setHashtags] = useState<string>('');
    const [shippingPayer, setShippingPayer] = useState<'seller' | 'buyer'>('seller');
    const [price, setPrice] = useState<string>('');

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
                                    <Camera className={styles['camera-icon']} />
                                    <p>Add up to<br />12 photos</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <section className={styles['description-section']}>
                    <h2 className={styles['h2']}>Description</h2>
                    <input
                        className={styles['input-field']}
                        placeholder="What are you selling?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={80} />
                    <textarea
                        className={styles['textarea-field']}
                        placeholder="Describe your item (5+ words)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={1000} />
                    <input
                        className={styles['input-field']}
                        placeholder="Add up to 7 hashtags (Optional)"
                        value={hashtags}
                        onChange={(e) => setHashtags(e.target.value)}
                        maxLength={7} />
                </section>

                <section className={styles['details-section']}>
                    <h2 className={styles['h2']}>Details</h2>
                    {['category', 'brand', 'condition', 'color'].map((item) => (
                        <select key={item} className={styles['select-field']}>
                            <option value="">{`Select ${item}${item === 'color' ? ' (optional)' : ''}`}</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                        </select>
                    ))}
                </section>

                <section className={styles['pricing-section']}>
                    <h2 className={styles['h2']}>Pricing</h2>
                    <div className={styles['price-input-container']}>
                        <span className={styles['currency-symbol']}>$</span>
                        <input
                            type="number"
                            className={styles['price-input']}
                            placeholder="Set your price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} />
                    </div>
                </section>

                <div className={styles['form-actions']}>
                    <button className={styles['list-button']}>List</button>
                    <button className={styles['save-draft-button']}>Save draft</button>
                </div>
            </div>
        </div>
    );
}
