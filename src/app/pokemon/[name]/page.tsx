'use client';

// Core Next
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
// React Query
import { useQuery } from '@tanstack/react-query';
// Service
import { pokemonService } from '@/services/pokemonServices';
import { pokemonColorService } from '@/services/pokemonColorService';
// Hooks
import { motion } from 'framer-motion';
import { useAppSelector } from '@/store/hooks';
// Icon
import { ArrowLeft, Weight, Ruler, Zap, Heart } from 'lucide-react';

export default function PokemonDetailPage() {
  // Get pokemon name from params
  const params = useParams();

  // Get favorites from Redux
  const favorites = useAppSelector(state => state.favorite?.items || []);
  const isFavorite = favorites.some(fav => fav.name === params.name);

  // React Query - Get Pokemon Detail
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemonDetail', params.name],
    queryFn: () => pokemonService.getPokemonDetail(params.name as string),
  });

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Error State
  if (isError || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral text-white gap-6">
        <h1 className="text-4xl font-bold">Pokemon Not Found</h1>
        <Link href="/" className="px-6 py-3 bg-primary text-black font-bold rounded-2xl hover:scale-105 transition-transform">
          Return to Pokedex
        </Link>
      </div>
    );
  }

  // Extract Pokemon Data
  const types = data.types.map((t) => t.type.name);
  // Get Pokemon Main Color
  const mainColor = types.length > 0 ? pokemonColorService.getColorByType(types[0]) : '#374151';
  // Get Pokemon Image URL
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE}/${data.id}.png`;

  return (
    <main className="min-h-screen bg-neutral pb-20">
      <div
        className="relative w-full md:w-full h-[40vh] md:h-[50vh] flex items-center justify-center rounded-b-[4rem] md:rounded-b-[6rem] shadow-2xl overflow-hidden px-10"
        style={{ backgroundColor: `${mainColor}33` }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-neutral/90" />

        <Link href="/" className="absolute top-24 lg:left-20 left-4  z-20">
          <motion.div
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white shadow-lg cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.div>
        </Link>

        {/* Favorite Button */}
        <Link href={`/pokemon/${name}/favorite`} className="absolute top-24 lg:right-20 right-4 z-20">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white shadow-lg cursor-pointer group"
            aria-label="Add to Favorites"
          >
            <Heart
              className={`w-6 h-6 transition-all duration-300 ${isFavorite
                ? 'fill-red-500 text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]'
                : 'text-white group-hover:text-red-400 group-hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]'
                }`}
            />
          </motion.div>
        </Link>

        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="relative w-64 h-64 md:w-96 md:h-96 z-10 mt-16"
        >
          <Image
            src={imageUrl}
            alt={data.name}
            fill
            priority
            sizes="(max-width: 768px) 256px, 384px"
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] md:text-[250px] font-black text-white/5 tracking-tighter pointer-events-none select-none z-0">
          #{data.id.toString().padStart(3, '0')}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 -mt-10 relative z-20">
        <div className="bg-[#15171A] border border-white/5 rounded-4xl p-6 md:p-10 shadow-2xl backdrop-blur-xl">

          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-black text-white capitalize tracking-tight mb-4 drop-shadow-lg">
              {data.name}
            </h1>
            <div className="flex flex-wrap justify-center gap-3">
              {types.map((type) => (
                <span
                  key={type}
                  style={{
                    backgroundColor: `${pokemonColorService.getColorByType(type)}20`,
                    color: pokemonColorService.getColorByType(type),
                    borderColor: `${pokemonColorService.getColorByType(type)}50`
                  }}
                  className="px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest border"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6 bg-white/5 p-6 md:p-8 rounded-3xl border border-white/5">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                About
              </h2>

              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-[#0B0C10] rounded-2xl shadow-inner">
                  <div className="flex items-center gap-2 text-white/50 mb-2">
                    <Weight className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Weight</span>
                  </div>
                  <span className="text-2xl font-black text-white">{(data.weight / 10).toFixed(1)} kg</span>
                </div>

                <div className="flex flex-col items-center justify-center p-4 bg-[#0B0C10] rounded-2xl shadow-inner">
                  <div className="flex items-center gap-2 text-white/50 mb-2">
                    <Ruler className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Height</span>
                  </div>
                  <span className="text-2xl font-black text-white">{(data.height / 10).toFixed(1)} m</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3 text-center md:text-left">Abilities</h3>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {data.abilities.map((ability) => (
                    <span key={ability.ability.name} className="px-4 py-2 bg-[#0B0C10] text-white rounded-xl text-sm font-bold capitalize border border-white/5">
                      {ability.ability.name.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-white/5 p-6 md:p-8 rounded-3xl border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-6">Base Stats</h2>

              <div className="space-y-4">
                {data.stats.map((stat) => (
                  <div key={stat.stat.name} className="flex items-center gap-4">
                    <div className="w-24 text-xs font-black uppercase tracking-widest text-white/50">
                      {stat.stat.name.replace('special-', 'sp. ')}
                    </div>
                    <div className="w-10 text-right font-mono font-bold text-white">
                      {stat.base_stat}
                    </div>
                    <div className="flex-1 h-3 bg-[#0B0C10] rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        style={{ backgroundColor: mainColor }}
                        className="h-full rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
