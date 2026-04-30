// Common Components
import BasicButton from '../buttons/BasicButton';
// Animation
import { motion } from 'framer-motion';
// Icons
import { Search } from 'lucide-react';

export default function EmptySearch({ onClear }: { onClear?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 w-full"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150" />
        <div className="relative bg-white/5 p-6 rounded-full border border-white/10 shadow-2xl backdrop-blur-md">
          <Search className="w-12 h-12 text-slate-300" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
        Upps Pokemon Not Found
      </h3>
      <p className="text-slate-400 text-center max-w-sm text-sm">
        Type a Pokémon name in the search box above to see its details, stats, and abilities.
      </p>
      {onClear && (
        <div className="mt-6">
          <BasicButton onClick={onClear} variant="outline">
            Clear Search
          </BasicButton>
        </div>
      )}
    </motion.div>
  );
}
