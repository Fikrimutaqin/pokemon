export default function PokemonCardSkeleton() {
  return (
    <div className="w-full bg-[#0F1012] border border-white/5 rounded-4xl lg:p-6 p-3 flex flex-col items-center justify-center min-h-[350px] animate-pulse">
      <div className="w-full flex justify-between items-center mb-2 opacity-50">
        <div className="w-12 h-4 bg-white/20 rounded"></div>
        <div className="w-6 h-6 bg-white/20 rounded-full"></div>
      </div>
      <div className="w-40 h-40 bg-white/5 rounded-full my-4"></div>
      <div className="w-32 h-8 bg-white/10 rounded mt-4"></div>
      <div className="flex gap-2 mt-3">
        <div className="w-16 h-6 bg-white/10 rounded-full"></div>
        <div className="w-16 h-6 bg-white/10 rounded-full"></div>
      </div>
      <div className="w-full h-12 bg-white/10 rounded-2xl mt-4"></div>
    </div>
  );
}
