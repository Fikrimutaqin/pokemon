'use client';

// React
import { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
// Core next
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
// React Query
import { useQuery } from '@tanstack/react-query';
// Hooks
import { useAppDispatch, useAppSelector } from '@/store/hooks';
// Service
import { pokemonService } from '@/services/pokemonServices';
import { pokemonColorService } from '@/services/pokemonColorService';
// Slice
import { addFavorite } from '@/store/slices/favoriteSlice';
// Components
import { SelectInput } from '@/components/common/inputs/SelectInput';
// Types
import { FavoriteFormInputs } from '@/types/FavoriteFromInputType';
// Icons
import { Star } from 'lucide-react';
// Animation
import { motion } from 'framer-motion';

export default function FavoritePokemonPage() {
  // Hooks
  const params = useParams();
  const name = params.name as string;
  const router = useRouter();
  // Dispatch
  const dispatch = useAppDispatch();
  // Find existing favorite
  const existingFavorite = useAppSelector(state => state.favorite.items.find(item => item.name === name));
  // Initialize form
  const { register, handleSubmit, reset, control, formState: { errors, isValid } } = useForm<FavoriteFormInputs>({
    defaultValues: {
      nickname: '',
      collectionType: 'Team',
      description: '',
    },
    mode: 'onChange',
  });

  // Reset Favorite Form if existing favorite
  useEffect(() => {
    if (existingFavorite) {
      reset({
        nickname: existingFavorite.nickname,
        collectionType: existingFavorite.collectionType,
        description: existingFavorite.description,
      });
    }
  }, [existingFavorite, reset]);

  // Fetch Pokemon Detail
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemonDetail', name],
    queryFn: () => pokemonService.getPokemonDetail(name),
  });

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F1012]">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Error State
  if (isError || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F1012] text-white">
        <h1 className="text-4xl font-bold">Pokemon Not Found</h1>
        <button onClick={() => router.back()} className="mt-6 text-primary hover:underline">Go Back</button>
      </div>
    );
  }

  // Pokemon Data
  const types = data.types.map((t) => t.type.name);
  const mainColor = types.length > 0 ? pokemonColorService.getColorByType(types[0]) : '#374151';
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE}/${data.id}.png`;

  // Get Pokemon Stats
  const getStat = (statName: string) => data.stats.find(s => s.stat.name === statName)?.base_stat || 0;
  const attack = getStat('attack');
  const defense = getStat('defense');
  const speed = getStat('speed');

  // Submit Favorite
  const onSubmit: SubmitHandler<FavoriteFormInputs> = (formData) => {
    dispatch(addFavorite({
      id: data.id,
      name: data.name,
      nickname: formData.nickname,
      collectionType: formData.collectionType,
      description: formData.description,
      types,
      imageUrl,
      stats: { attack, defense, speed },
      addedAt: existingFavorite?.addedAt || new Date().toISOString()
    }));
    router.push(`/collection`);
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] p-4 md:p-10 flex flex-col items-center justify-center font-sans pt-24">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 md:gap-10 h-full lg:h-[80vh]">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 rounded-4xl overflow-hidden relative shadow-2xl flex flex-col justify-between p-8"
          style={{
            background: `linear-gradient(to bottom, ${mainColor}50 0%, #000000 100%)`,
            border: `1px solid ${mainColor}30`
          }}
        >
          <div className="flex flex-wrap lg:flex-row justify-between items-start z-10 relative">
            <div>
              <span className="text-white/60 font-mono text-sm tracking-widest block mb-2 drop-shadow-md">
                #{data.id.toString().padStart(4, '0')}
              </span>
              <h1 className="text-5xl font-black text-white capitalize tracking-tighter drop-shadow-md">
                {data.name}
              </h1>
            </div>
            <div className="flex gap-2">
              {types.map(t => (
                <span key={t} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border" style={{ borderColor: mainColor, color: mainColor, backgroundColor: `${mainColor}20` }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <div className="relative w-72 h-72 lg:w-[400px] lg:h-[400px] mt-10">
              <Image
                src={imageUrl}
                alt={data.name}
                fill
                priority
                sizes="(max-width: 1024px) 288px, 400px"
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 z-10 relative mt-auto pt-10">
            <div className="flex flex-col">
              <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">Attack</span>
              <span className="text-2xl font-black text-white">{attack}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">Defense</span>
              <span className="text-2xl font-black text-white">{defense}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">Speed</span>
              <span className="text-2xl font-black text-white">{speed}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 bg-[#1A1D24] rounded-4xl border border-white/5 shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="p-8 md:p-12 flex-1 overflow-y-auto">
            <form id="favorite-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <label className="text-white/70 text-[11px] font-bold tracking-widest uppercase">Nickname</label>
                  <span className="text-red-400 text-[10px] font-bold tracking-widest uppercase">Required</span>
                </div>
                <input
                  type="text"
                  {...register('nickname', { required: 'Nickname is required to save favorite.' })}
                  placeholder="e.g. Flare Master"
                  className={`w-full bg-[#0B0C10] border rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-1 transition-all ${errors.nickname ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/5 focus:border-primary focus:ring-primary'}`}
                />
                {errors.nickname && (
                  <span className="text-red-500 text-xs mt-1 font-bold">{errors.nickname.message}</span>
                )}
              </div>
              <Controller
                name="collectionType"
                control={control}
                render={({ field }) => (
                  <SelectInput
                    label="Collection Type"
                    options={[
                      { label: 'Team', value: 'Team' },
                      { label: 'Wishlist', value: 'Wishlist' },
                      { label: 'Owned', value: 'Owned' }
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <label className="text-white/70 text-[11px] font-bold tracking-widest uppercase">Description</label>
                  <span className="text-white/30 text-[10px] font-bold tracking-widest uppercase">Optional</span>
                </div>
                <textarea
                  {...register('description')}
                  placeholder="Brief notes on strategy or origin..."
                  rows={4}
                  className="w-full bg-[#0B0C10] border border-white/5 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-all resize-none"
                />
              </div>

            </form>
          </div>
          <div className="p-6 md:px-12 md:py-6 bg-[#15171A] border-t border-white/5 flex flex-col-reverse md:flex-row justify-end items-center gap-4">
            <button
              onClick={() => router.back()}
              className="w-full md:w-auto px-8 py-4 rounded-xl text-white font-bold hover:bg-white/5 transition-colors border border-transparent"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="favorite-form"
              disabled={!isValid}
              className={`w-full md:w-auto px-10 py-4 rounded-xl font-black text-black flex items-center justify-center gap-2 transition-all ${isValid ? 'bg-primary hover:bg-primary/90 hover:scale-105' : 'bg-primary/50 cursor-not-allowed'}`}
            >
              <Star className="w-5 h-5 fill-black" />
              Save to Favorites
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
