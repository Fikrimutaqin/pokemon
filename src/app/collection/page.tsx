'use client';
// Core Next
import Image from 'next/image';
import Link from 'next/link';
// Redux Toolkit
import { useAppSelector, useAppDispatch } from '@/store/hooks';
// Services
import { pokemonColorService } from '@/services/pokemonColorService';
import { removeFavorite } from '@/store/slices/favoriteSlice';
// Animation
import { motion } from 'framer-motion';
// Icons
import { LayoutGrid, Trash2, ArrowLeft } from 'lucide-react';

export default function CollectionPage() {
  // Selector for get data from Redux Toolkit
  const favorites = useAppSelector(state => state.favorite.items);
  // Dispatch for send data to Redux Toolkit
  const dispatch = useAppDispatch();
  // Function to get collection color
  const getCollectionColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'team': return '#EAB308';
      case 'wishlist': return '#D4D4D8';
      case 'owned': return '#F87171';
      default: return '#EAB308';
    }
  };
  // Function to get collection label
  const getCollectionLabel = (type: string) => {
    switch (type.toLowerCase()) {
      case 'team': return 'TEAM MEMBER';
      case 'wishlist': return 'WISHLIST';
      case 'owned': return 'OWNED UNIT';
      default: return type.toUpperCase();
    }
  };

  return (
    <div className="min-h-screen text-white font-sans pb-24 pt-32">
      <div className="max-w-6xl mx-auto px-6">

        <Link href="/" className="absolute lg:top-24 top-20 lg:left-64 left-4 z-20">
          <motion.div
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white shadow-lg cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.div>
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 lg:mt-8 mt-5">
          <p className="text-[#9CA3AF] text-base md:text-lg font-medium leading-relaxed max-w-2xl">
            Manage your curated teams, wishlist entries, and specialized research targets in one centralized dashboard.
          </p>

          <div className="flex items-center gap-3 bg-[#111111] text-[#A3E635] px-6 py-3 rounded-lg font-mono text-xs font-bold tracking-widest shadow-md shrink-0">
            <LayoutGrid className="w-4 h-4" />
            <span>{favorites.length} TOTAL UNITS</span>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-32 border-2 border-dashed border-gray-200 rounded-3xl">
            <h2 className="text-2xl font-bold text-gray-400 mb-2">No Pokemon Collected Yet</h2>
            <p className="text-gray-500 mb-6">Start exploring and save some Pokemon to your collection!</p>
            <Link href="/" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
              Explore Pokedex
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav, i) => {
              const collColor = getCollectionColor(fav.collectionType);

              return (
                <Link key={fav.id} href={`/pokemon/${fav.name}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-[#151515] rounded-2xl p-6 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300 group cursor-pointer shadow-lg"
                  >
                    <div className="mb-6">
                      <div className="flex justify-between items-start">
                        <div className="min-w-0 pr-4">
                          <span className="text-[10px] font-black tracking-widest mb-1.5 block" style={{ color: collColor }}>
                            {getCollectionLabel(fav.collectionType)}
                          </span>
                          <h2 className="text-white text-2xl font-bold tracking-tight mb-0.5 truncate capitalize">
                            {fav.nickname || fav.name}
                          </h2>
                          <p className="text-[#9CA3AF] font-mono text-xs tracking-widest capitalize">
                            #{fav.id.toString().padStart(4, '0')} • {fav.name}
                          </p>
                          {fav.description && (
                            <p className="text-gray-400 text-xs mt-3 line-clamp-2 italic pr-2">
                              "{fav.description}"
                            </p>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(removeFavorite(fav.id));
                          }}
                          className="p-2 text-gray-500 hover:text-red-500 bg-[#1C1C1C] hover:bg-red-500/10 rounded-full transition-colors z-10 shadow-sm shrink-0"
                          title="Remove from Collection"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#1C1C1C] rounded-xl aspect-square w-full relative flex items-center justify-center mb-6 overflow-hidden transition-colors">
                      <div className="relative w-[70%] h-[70%]">
                        <Image
                          src={fav.imageUrl}
                          alt={fav.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-500 ease-out"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {fav.types.map(t => {
                        const tColor = pokemonColorService.getColorByType(t);
                        return (
                          <span
                            key={t}
                            className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border"
                            style={{
                              color: tColor,
                              borderColor: `${tColor}40`,
                              backgroundColor: `${tColor}10`
                            }}
                          >
                            {t}
                          </span>
                        );
                      })}
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
