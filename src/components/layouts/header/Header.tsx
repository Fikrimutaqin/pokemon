"use client";

// Next
import Link from 'next/link';
// Redux Toolkit
import { useAppSelector } from '@/store/hooks';
// Framer Motion
import { motion } from 'framer-motion';
// Icons
import { Heart } from 'lucide-react';

export default function Header() {
    // Selector for get data from Redux Toolkit
    const favorites = useAppSelector(state => state.favorite.items);
    // Function to count total favorites
    const totalFavorites = favorites.length;

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 z-50 w-full bg-neutral border-b border-white/10"
        >
            <div className="container mx-auto px-4 md:px-6 h-16 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold text-lg tracking-tight text-white">
                        Pokédex Explorer
                    </span>
                </Link>

                <div className="flex items-center space-x-6">
                    <Link href="/collection">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative cursor-pointer group p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors shadow-sm backdrop-blur-md"
                        >
                            <Heart className="w-6 h-6 text-white/50 group-hover:text-red-500 group-hover:fill-red-500 transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]" />

                            <span className="absolute -top-1.5 -right-1.5 bg-primary text-black text-[11px] font-black h-[22px] w-[22px] rounded-full flex items-center justify-center border-2 border-neutral shadow-lg">
                                {totalFavorites}
                            </span>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.header>
    );
}