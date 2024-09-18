import Image from 'next/image';
import { ProductsJsonType } from '@/app/page';

interface ProductGridProps {
    title: string;
    products: ProductsJsonType[];
}

export default function ProductGrid({ title, products }: ProductGridProps) {
    // 固定の商品データを定義
    // const fixedProducts: ProductsJsonType[] = [
    //     { id: 1, name: 'Be a Pro bicycle', price: 68, image: '/images/product1.jpg', description: 'The "Be a Pro Bicycle" is designed for a wide range of users, from beginners to professionals. Its lightweight frame and high-performance gear system make it suitable for everything from city commuting to long-distance touring. It is an ideal choice for those looking to improve their fitness or for daily commuting.' },
    //     { id: 2, name: 'Sunglasses', price: 50, image: '/images/product2.jpg', description: 'These stylish sunglasses are a must-have for summer days and outdoor activities. With UV protection lenses, they not only safeguard your eyes but also enhance your style. Perfect for driving, beach outings, or everyday use, they offer a great balance of fashion and function.' },
    //     { id: 3, name: 'mercari art', price: 10000, image: '/images/product3.jpg', description: 'The "Mercari Art" piece is a luxurious item tailored for collectors and art enthusiasts. With its unique design and high-level craftsmanship, this artwork is destined to be the focal point of any interior space, drawing attention and admiration from all who see it.' },
    //     { id: 4, name: 'Stylish cutlery', price: 40, image: '/images/product4.jpg', description: 'The "Stylish Cutlery" set elevates your dining experience with its elegant design and practical functionality. Whether for everyday meals or special dinners, this cutlery set adds a touch of sophistication to any table setting. It is also an excellent gift choice.' },
    //     { id: 5, name: 'Trader Joe\'s tote bag', price: 80.00, image: '/images/product5.jpg', description: 'The "Trader Joe\'s Tote Bag" is made from high-quality materials, making it a perfect everyday carryall. Despite its large capacity, it remains lightweight and easy to carry, making it ideal for shopping, picnics, or travel. Its versatility and durability make it a go-to accessory for any occasion.' },
    //     { id: 6, name: 'Stuffed Rabbit of Dylan\'s Candy Bar', price: 30.00, image: '/images/product6.jpg', description: 'The adorable "Stuffed Rabbit of Dylan\'s Candy Bar" is a plush toy loved by both children and adults. Made from soft materials, it’s perfect for cuddling and adds a charming touch to any bed or sofa. It\'s also a delightful gift choice, bringing joy and comfort to the recipient.' },
    // ];



    // プロパティで渡された products を無視して、固定の商品データを使用
    return (
        <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
                {/* <h2 className="text-xl font-bold text-white">{title}</h2>
                <a href="#" className="text-blue-400 hover:underline">See all</a> */}
            </div>
            <div className="grid grid-cols-3 gap-4">
                {products.map((product, index) => (
                    <div key={index} className="bg-blue-800 rounded-lg overflow-hidden">
                        <div className="aspect-w-1 aspect-h-1 relative">
                            <Image
                                src={product.image ?? 'https://placehold.co/200x200/900C3F/31343C'}
                                alt={product.name}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="p-2">
                            <div className="text-sm text-white truncate">{product.name}</div>
                            <div className="text-sm font-bold text-white">${product.price.toFixed(2)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
