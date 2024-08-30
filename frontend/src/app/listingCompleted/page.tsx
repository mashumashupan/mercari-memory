"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './listing.module.css';
import { useEffect } from 'react';
import { useChat } from "@/store/use-chat-store";

export default function ListingComplete() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-sm w-full text-center">
                <div className="mb-6">
                    <div className="inline-block">
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-red-400 rounded-full"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-10 h-10 bg-yellow-400 rounded-full ml-4 mt-4"></div>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-4 bg-blue-400 w-1 mx-auto"></div>
                        </div>
                    </div>
                </div>
                <h2 className="text-xl font-bold mb-4">出品が完了しました</h2>
                <p className="text-gray-600 mb-6">出品した商品はマイページからいつでも確認できます</p>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-md w-full mb-3 transition duration-300">
                    ストーリーシェアする
                </button>
                <Link href="/">
                    <button className="bg-white hover:bg-gray-100 text-gray-700 font-bold py-3 px-4 rounded-md w-full border border-gray-300 transition duration-300">
                        出品した商品をみる
                    </button>
                </Link>
            </div>
        </div>
    );
}
