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
import { aiService } from '@/services/aiService';
// Hooks
import { motion } from 'framer-motion';
import { useAppSelector } from '@/store/hooks';
import { useState } from 'react';
// Icon
import { ArrowLeft, Weight, Ruler, Zap, Heart, Sparkles, Bot } from 'lucide-react';

export default function PokemonDetailPage() {
  // Get pokemon name from params
  const params = useParams();

  // Get favorites from Redux
  const favorites = useAppSelector(state => state.favorite?.items || []);
  const isFavorite = favorites.some(fav => fav.name === params.name);

  // AI State
  const [aiSummary, setAiSummary] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [showAi, setShowAi] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGenerateAI = async (pokemonData: any, typesList: string[]) => {
    if (aiSummary) {
      setShowAi(!showAi);
      return;
    }
    
    setIsGeneratingAi(true);
    setShowAi(true);
    try {
      const summary = await aiService.generateSummary(pokemonData, typesList);
      setAiSummary(summary);
    } catch {
      setAiSummary('Bzzzt! Koneksi Rotom terputus. Coba lagi nanti!');
    } finally {
      setIsGeneratingAi(false);
    }
  };

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
        <Link href={`/pokemon/${data.name}/favorite`} className="absolute top-24 lg:right-20 right-4 z-20">
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

            {/* AI Generator Button */}
            <div className="flex justify-center mt-6">
              <button 
                onClick={() => handleGenerateAI(data, types)}
                className="flex items-center gap-2 bg-linear-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 border border-purple-500/30 text-purple-300 px-5 py-2.5 rounded-full font-semibold transition-all shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] group"
              >
                <Sparkles className="w-4 h-4 text-purple-400 group-hover:animate-spin" />
                Ask Rotom AI
              </button>
            </div>

            {/* AI Summary Box */}
            {showAi && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 mx-auto max-w-2xl text-left bg-[#1A1A24] border border-purple-500/20 rounded-2xl p-5 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-purple-500 to-blue-500" />
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500/10 p-2.5 rounded-xl shrink-0 border border-purple-500/20">
                    <Bot className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-purple-300 font-bold mb-2 text-xs tracking-widest uppercase">Rotom Pokedex Analysis</h3>
                    {isGeneratingAi ? (
                      <div className="flex gap-1.5 items-center h-6">
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    ) : (
                      <p className="text-gray-300 leading-relaxed text-sm/loose italic">
                        &quot;{aiSummary}&quot;
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
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
