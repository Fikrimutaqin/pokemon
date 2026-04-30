'use client';
// Core Next
import Image from 'next/image';
import Link from 'next/link';
// Animation
import { motion } from 'framer-motion';
// Icon
import { Heart } from 'lucide-react';
// Hooks
import { useAppSelector } from '@/store/hooks';
// Type
import { PokemonCardProps } from '@/types/PokemonCardType';

export default function PokemonCard({
    id,
    name,
    types,
    imageUrl,
    priority,
    backgroundColor,
}: PokemonCardProps) {
    const favorites = useAppSelector(state => state.favorite?.items || []);
    const isFavorite = favorites.some(fav => fav.name === name);

    return (
        <motion.div
            whileHover={{ y: -8 }}
            style={{ backgroundColor: `${backgroundColor || '#0F1012'}33` }}
            className="group relative w-full backdrop-blur-xl border border-white/5 rounded-4xl lg:p-6 p-3 flex flex-col items-center shadow-2xl transition-all duration-300"
        >
            <div className="w-full flex justify-between items-center z-20 mb-2">
                <span className="text-white/30 font-mono text-sm tracking-widest">
                    #{id.padStart(3, '0')}
                </span>
                <Link
                    href={`/pokemon/${name}/favorite`}
                    className={`transition-colors cursor-pointer z-20 hover:scale-110 active:scale-90 ${isFavorite
                            ? 'text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                            : 'text-white/20 hover:text-red-400 hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]'
                        }`}
                >
                    <Heart className={`w-6 h-6 transition-all ${isFavorite ? 'fill-red-500' : ''}`} />
                </Link>
            </div>

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
                        priority={priority}
                        className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                        sizes="(max-width: 768px) 150px, 250px"
                    />
                </motion.div>
            </div>

            <div className="w-full mt-4 space-y-4">
                <div>
                    <h3 className="text-2xl font-bold text-white capitalize tracking-tight">
                        {name}
                    </h3>

                    <div className="flex flex-wrap lg:flex-row gap-2 mt-3">
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

                <Link href={`/pokemon/${name}`} className="w-full">
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-white text-black font-black text-sm rounded-2xl hover:bg-primary transition-colors duration-300 cursor-pointer shadow-lg"
                    >
                        View Details
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );
}

