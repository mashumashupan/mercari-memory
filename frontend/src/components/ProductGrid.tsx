import Image from 'next/image';
import { ProductsJsonType } from '@/app/page';

interface ProductGridProps {
    title: string;
    products: ProductsJsonType[];
}

export default function ProductGrid({ title, products }: ProductGridProps) {
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
