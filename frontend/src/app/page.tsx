"use client";

import Header from '../components/Header'
import ProductGrid from '../components/ProductGrid'
import ChatIcon from '../components/ChatIcon'; 
import Footer from '../components/Footer';

export default function Home() {
  const topsProducts = [
    { name: 'Shirt', price: 12.00, image: 'https://placehold.co/200x200/EEE/31343C' },
    { name: 'Vince 100% Linen silk 10...', price: 22.00, image: 'https://placehold.co/200x200/FFC300/31343C' },
    { name: 'Nella Fantasia Full Lace ...', price: 18.00, image: 'https://placehold.co/200x200/DAF7A6/31343C' },
    { name: 'Express men\'s dress shirt ...', price: 21.00, image: 'https://placehold.co/200x200/FF5733/31343C' },
    { name: 'I don\'t have the blood al...', price: 17.00, image: 'https://placehold.co/200x200/C70039/31343C' },
    { name: 'Lilly Pulitzer for Target Fl...', price: 29.00, image: 'https://placehold.co/200x200/900C3F/31343C' },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProductGrid products={topsProducts} title={''} />
      </main>
      <ChatIcon />
      <Footer />
    </>
  );
}
