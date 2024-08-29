//　状態管理
import { create } from "zustand";

type UseChatStore = {
    title: string; // 表示用
    description: string;
    price: number;
    setTitle: (_title: string) => void; // 表示の値を変えるための関数
    setDescription: (_description: string) => void;
    setPrice: (_price: number) => void;
};

export const useChat = create<UseChatStore>((set) => ({
    title: "",
    description: "",
    price: 0,
    setTitle: (_title) => set({ title: _title }),
    setDescription: (_description) => set({ description: _description }),
    setPrice: (_price: number) => set({ price: _price }),
}));