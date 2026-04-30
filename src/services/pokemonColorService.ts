export const pokemonColorService = {
  /**
   * Get a beautiful HEX color based on Pokemon type
   * @param type The primary type of the Pokemon
   * @returns Hex color string
   */
  getColorByType: (type: string): string => {
    const typeColors: Record<string, string> = {
      normal: '#9CA3AF', // gray-400
      fire: '#EF4444',   // red-500
      water: '#3B82F6',  // blue-500
      electric: '#EAB308', // yellow-500
      grass: '#22C55E',  // green-500
      ice: '#6EE7B7',    // emerald-300
      fighting: '#EF4444', // red-500
      poison: '#A855F7', // purple-500
      ground: '#D97706', // amber-600
      flying: '#818CF8', // indigo-400
      psychic: '#EC4899', // pink-500
      bug: '#84CC16',    // lime-500
      rock: '#A16207',   // yellow-700
      ghost: '#6366F1',  // indigo-500
      dragon: '#8B5CF6', // violet-500
      dark: '#1F2937',   // gray-800
      steel: '#94A3B8',  // slate-400
      fairy: '#F472B6',  // pink-400
    };

    return typeColors[type.toLowerCase()] || '#374151'; // Default fallback (gray-700)
  }
};
