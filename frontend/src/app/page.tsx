"use client";

import Header from '../components/Header'
import ProductGrid from '../components/ProductGrid'
import ChatIcon from '../components/ChatIcon'; 
// import Story from '../components/Story';
import Footer from '../components/Footer';

export default function Home() {
  const stories = [
    { name: 'User 1', image: 'https://placehold.co/200x200/31343C/EEE' },
    { name: 'User 2', image: 'https://placehold.co/200x200/FFC300/31343C' },
    { name: 'User 3', image: 'https://placehold.co/200x200/DAF7A6/31343C' },
    { name: 'User 4', image: 'https://placehold.co/200x200/FF5733/31343C' },
    { name: 'User 5', image: 'https://placehold.co/200x200/C70039/31343C' },
  ];

  const topsProducts = [
    { name: 'Shirt', price: 12.00, image: 'https://placehold.co/200x200/EEE/31343C' },
    { name: 'Vince 100% Linen silk 10...', price: 22.00, image: 'https://placehold.co/200x200/FFC300/31343C' },
    { name: 'Nella Fantasia Full Lace ...', price: 18.00, image: 'https://placehold.co/200x200/DAF7A6/31343C' },
    { name: 'Express men\'s dress shirt ...', price: 21.00, image: 'https://placehold.co/200x200/FF5733/31343C' },
    { name: 'I don\'t have the blood al...', price: 17.00, image: 'https://placehold.co/200x200/C70039/31343C' },
    { name: 'Lilly Pulitzer for Target Fl...', price: 29.00, image: 'https://placehold.co/200x200/900C3F/31343C' },
  ];

  const athleticProducts = [
    { name: 'Wildfox Sweat women\'s s...', price: 20.00, image: 'https://placehold.co/200x200/581845/FFFFFF' },
    { name: '90s Style Chicago Bulls ...', price: 29.00, image: 'https://placehold.co/200x200/FFC300/31343C' },
    { name: 'Nike shirts men', price: 20.00, image: 'https://placehold.co/200x200/DAF7A6/31343C' },
    { name: 'Nike Mens Short Sleeve ...', price: 17.97, image: 'https://placehold.co/200x200/FF5733/31343C' },
    { name: 'Like New Women\'s/Girls ...', price: 20.00, image: 'https://placehold.co/200x200/C70039/31343C' },
    { name: 'Queen Of Hearts Card S...', price: 20.00, image: 'https://placehold.co/200x200/900C3F/31343C' },
  ];

  return (
    <>
      <Header />
      {/* <Story stories={stories} /> */}
      <main className="container mx-auto px-4 py-8">
        <ProductGrid title="Tops & t-shirts" products={topsProducts} />
        <ProductGrid title="Athletic apparel" products={athleticProducts} />
      </main>
      <ChatIcon />
      <Footer />
    </>
  )
}
