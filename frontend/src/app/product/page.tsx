"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './listing.module.css';
import { useEffect } from 'react';

export default function ProductListing() {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md w-full">
                <img
                    src="/api/placeholder/400/300"
                    alt="Vivienne Westwood Betty Croco Mini Handbag"
                    className="w-full h-64 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">Vivienne Westwood Betty Croco Mini Handbag</h2>
                    <p className="text-2xl font-bold mb-1">$223.74</p>
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
                        <button
                            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                            className="flex justify-between items-center w-full py-2 px-4 bg-gray-200 rounded"
                        >
                            <span className="font-semibold">Details</span>
                        </button>
                        {isDetailsOpen && (
                            <div className="mt-2 p-4 bg-gray-50 rounded">
                                <p className="mb-2">The Vivienne Westwood Betty Croco Mini Handbag is a stunning accessory that combines style and functionality. Here are some key features:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Crafted from high-quality croco-embossed leather</li>
                                    <li>Iconic Vivienne Westwood orb logo embellishment</li>
                                    <li>Compact size perfect for everyday use</li>
                                    <li>Adjustable and detachable shoulder strap</li>
                                    <li>Interior zip pocket for secure storage</li>
                                    <li>Dimensions: 20cm x 14cm x 6cm (approx.)</li>
                                    <li>Made in Italy</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}