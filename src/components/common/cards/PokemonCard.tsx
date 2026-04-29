'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { PokemonCardProps } from '@/types/PokemonCardType';

export default function PokemonCard({
    id,
    name,
    types,
    imageUrl,
    onClick
}: PokemonCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group relative w-full bg-[#0F1012] border border-white/5 rounded-4xl p-6 flex flex-col items-center shadow-2xl transition-all duration-300"
        >
            {/* Top Bar: ID and Favorite */}
            <div className="w-full flex justify-between items-center mb-2">
                <span className="text-white/30 font-mono text-sm tracking-widest">
                    #{id.padStart(3, '0')}
                </span>
                <button className="text-white/20 hover:text-red-500 transition-colors">
                    <Heart className="w-6 h-6" />
                </button>
            </div>

            {/* Main Image */}
            <div className="relative w-full aspect-square flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-white/2 rounded-full scale-90 blur-2xl group-hover:bg-primary/5 transition-colors duration-500" />
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative w-full h-full z-10"
                >
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                        sizes="(max-width: 768px) 150px, 250px"
                    />
                </motion.div>
            </div>

            {/* Info Section */}
            <div className="w-full mt-4 space-y-4">
                <div>
                    <h3 className="text-2xl font-bold text-white capitalize tracking-tight">
                        {name}
                    </h3>

                    <div className="flex gap-2 mt-3">
                        {types.map((type) => (
                            <span
                                key={type}
                                className='px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border bg-slate-500/20 text-slate-400 border-slate-500/30'
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action Button */}
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={onClick}
                    className="w-full py-4 bg-white text-black font-black text-sm rounded-2xl hover:bg-primary transition-colors duration-300 cursor-pointer shadow-lg"
                >
                    View Details
                </motion.button>
            </div>
        </motion.div>
    );
}

