"use client";

import Header from '../components/Header'
import ProductGrid from '../components/ProductGrid'
import ChatIcon from '../components/ChatIcon';
import Story from '../components/Story';
import Footer from '../components/Footer';
import apiFetch from '@/utils/api';
import { useEffect } from 'react';
import { useState } from 'react';

// 型エイリアスを使用した定義
export type ProductsJsonType = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function Home() {
  const stories = [
    { name: 'User 1', image: '/images/user1-icon.png' },
    { name: 'User 2', image: '/images/user2-icon.png' },
    { name: 'User 3', image: '/images/user3-icon.png' },
    { name: 'User 4', image: '/images/user4-icon.png' },
    { name: 'User 5', image: '/images/user5-icon.png' },
  ];

  const [topsProducts, setTopsProducts] = useState<ProductsJsonType[]>([]);

  // データを取ってくる関数
  useEffect(() => {
    // return () => {
    getProducts().then((data) => {
      console.log('data:', data);
      setTopsProducts(data);
      console.log('topsProducts:', topsProducts);
    });
    // };
  }, []);

  const getProducts = async (): Promise<ProductsJsonType[]> => {
    try {
      const chatResponse = await apiFetch<ProductsJsonType[]>(`/api/products`);
      return chatResponse;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return [];
    }
  };

  return (
    <>
      <Header />
      <Story stories={stories} />
      <main className="container mx-auto px-4 py-8">
        <ProductGrid products={topsProducts} title={''} />
      </main>
      <ChatIcon />
      <Footer />
    </>
  );
}