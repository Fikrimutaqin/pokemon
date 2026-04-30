// Helper function to create a fake time delay.
// This will pause execution for the specified milliseconds (ms),
// making it feel like the program is actually busy processing something.
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const aiService = {
  /**
   * Generates a smart summary text for a Pokemon.
   * This function pretends to be a real AI (Mock AI).
   * 
   * @param pokemonData Raw Pokemon data (fetched from the API)
   * @param types Array containing the Pokemon's types (e.g. ['fire', 'flying'])
   * @returns String containing the Rotom AI analysis
   */
  generateSummary: async (pokemonData: any, types: string[]): Promise<string> => {

    // 1. Simulate the AI "thinking" for 1.5 seconds (1500 ms).
    // This is crucial to make the loading UI feel natural to the user.
    await delay(1500);

    // 2. Combine the array of types into a single string.
    // If the types are ['fire', 'flying'], it becomes "fire and flying".
    const typeNames = types.join(' and ');

    // 3. Simple "Artificial Intelligence" logic: Find the Pokemon's highest stat.
    // We prepare a variable to hold the name of the stat and its highest value.
    let highestStat = { name: '', value: 0 };

    // Make sure the stats data exists and is an Array
    if (pokemonData?.stats && Array.isArray(pokemonData.stats)) {
      // Loop through each stat one by one (hp, attack, defense, etc.)
      pokemonData.stats.forEach((s: any) => {
        // If the current stat value is greater than the highest value we've stored...
        if (s.base_stat > highestStat.value) {
          // ...then make this the new highest stat!
          // (We also use replace to remove dashes, e.g., turning "special-attack" into "special attack")
          highestStat = { name: s.stat.name.replace('-', ' '), value: s.base_stat };
        }
      });
    }

    // 4. Prepare several possible responses (Templates).
    // Since we're not using a real AI API, we manually create variations of sentences
    // and inject the data variables we processed above.
    const templates = [
      `Bzzzt! Based on the Pokedex system analysis, ${pokemonData.name.toUpperCase()} is an amazing ${typeNames}-type Pokemon! With its ${highestStat.name} reaching an impressive ${highestStat.value}, it excels greatly in battle. Be sure to take advantage of its elemental strengths!`,
      `Rotom AI here! 🤖 The data shows that ${pokemonData.name.toUpperCase()} has incredible potential as a ${typeNames}-type. Its main strength lies in its ${highestStat.name}, boasting a value of ${highestStat.value}. It's a perfect addition to your main team!`,
      `Analysis complete! ✨ ${pokemonData.name.toUpperCase()} (Type: ${typeNames}) has some very unique characteristics. Since its highest attribute is its ${highestStat.name} (${highestStat.value}), this Pokemon will be a nightmare for opponents if you use attack strategies that rely on that advantage.`
    ];

    // 5. Pick a random response.
    // Math.random() generates a random decimal like 0.5. Multiplying by array length (3) gives 1.5.
    // Math.floor(1.5) rounds it down to index 1.
    const randomIndex = Math.floor(Math.random() * templates.length);

    // Return the randomly selected sentence
    return templates[randomIndex];
  }
};
