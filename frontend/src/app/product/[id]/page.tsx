"use client";

import React, { useState } from 'react';
import { ProductsJsonType } from '@/app/page';
import apiFetch from '@/utils/api';
import { useEffect } from 'react';

export default function ProductListing({ params }: { params: { id: number } }) {
    const [product, setProduct] = useState<ProductsJsonType | null>(null);

    // 商品データを取得
    const getProduct = async (id: number) => {
        const data = await apiFetch<ProductsJsonType>(`/api/product/${id}`);
        setProduct(data);
    }

    // 商品データを取得
    useEffect(() => {
        getProduct(params.id);
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md w-full">
                <img
                    src={product?.image ?? 'https://placehold.co/200x200/900C3F/31343C'}
                    alt="Vivienne Westwood Betty Croco Mini Handbag"
                    className="w-full h-64 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{product?.name}</h2>
                    <p className="text-2xl font-bold mb-1">${product?.price}</p>
                    <p className="text-sm text-gray-600 mb-2">+ $34.00 international shipping</p>
                    <p className="text-sm mb-4">or 4 payments of $69.88 by <span className="font-bold">zip</span></p>
                    <div className="bg-gray-100 rounded p-3 mb-4">
                        <div className="flex items-center">
                            <div className="w-5 h-5 bg-blue-500 rounded-full mr-2"></div>
                            <span className="font-semibold">Smooth international shipping</span>
                        </div>
                        <p className="text-sm mt-1">BEENOS works with us to make international orders as simple as domestic ones.</p>
                    </div>
                    <div>
                        <div className="mt-2 p-4 bg-gray-50 rounded">
                            <p className="mb-2">{product?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}