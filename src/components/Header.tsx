"use client";

import { useState } from "react";
import CreateAppModal from "@/components/CreateAppModal";

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <header className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600"></div>
                        <span className="font-bold text-xl tracking-tight">AppsPortfolio</span>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn btn-primary flex items-center gap-2"
                    >
                        <span>+</span> Add Service
                    </button>
                </div>
            </header>

            {isModalOpen && <CreateAppModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
}
