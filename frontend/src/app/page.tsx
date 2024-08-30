"use client";

import Header from '../components/Header'
import ProductGrid from '../components/ProductGrid'
import ChatIcon from '../components/ChatIcon';
import Story from '../components/Story';
import Footer from '../components/Footer';
import apiFetch from '@/utils/api';
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';

// 型エイリアスを使用した定義
export type ProductsJsonType = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export const getServerSideProps: GetServerSideProps<{ products: ProductsJsonType[] }> = async (context) => {
  const products = await getProducts();
  return { props: { products } };
}

const getProducts = async (): Promise<ProductsJsonType[]> => {
  try {
    const chatResponse = await apiFetch<ProductsJsonType[]>(`/api/products`);
    // priceがnumberになるようにJSONをパース
    // const json = JSON.parse(chatResponse).map((product: ProductsJsonType) => {
    // return {
    //   id: json?.id,
    //   name: json?.name,
    //   price: json?.price,
    //   description: json?.description,
    //   image: json?.image
    // } as ProductsJsonType; // priceがnumberになる
    // });
    return chatResponse;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
};

export default function Home() {
  const stories = [
    { name: 'User 1', image: '/images/user1-icon.png' },
    { name: 'User 2', image: '/images/user2-icon.png' },
    { name: 'User 3', image: '/images/user3-icon.png' },
    { name: 'User 4', image: '/images/user4-icon.png' },
    { name: 'User 5', image: '/images/user5-icon.png' },
  ];

  // let topsProducts: ProductsJsonType[] = [];
  // const topsProducts = [
  //   { name: 'Shirt', price: 12.00, image: 'https://placehold.co/200x200/EEE/31343C' },
  //   { name: 'Vince 100% Linen silk 10...', price: 22.00, image: 'https://placehold.co/200x200/FFC300/31343C' },
  //   { name: 'Nella Fantasia Full Lace ...', price: 18.00, image: 'https://placehold.co/200x200/DAF7A6/31343C' },
  //   { name: 'Express men\'s dress shirt ...', price: 21.00, image: 'https://placehold.co/200x200/FF5733/31343C' },
  //   { name: 'I don\'t have the blood al...', price: 17.00, image: 'https://placehold.co/200x200/C70039/31343C' },
  //   { name: 'Lilly Pulitzer for Target Fl...', price: 29.00, image: 'https://placehold.co/200x200/900C3F/31343C' },
  // ];

  // データを取ってくる関数
  // useEffect(() => {
  //   return () => {
  //     getProducts().then((data) => {
  //       console.log('data:', data);
  //       topsProducts = data;
  //       console.log('topsProducts:', topsProducts);
  //     });
  //   };
  // });

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
