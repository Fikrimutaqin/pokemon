'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Header() {
    const pathname = usePathname();

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
                    <button className="relative ransition-colors cursor-pointer group">
                        <Heart className="w-8 h-8 fill-tertiary transition-all" />
                        <span className="absolute -top-1 -right-1 bg-primary text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                            0
                        </span>
                    </button>
                </div>
            </div>
        </motion.header>
    );
}