export interface StatItem {
    base_stat: number;
    stat: {
        name: string;
    };
}

export interface PokemonData {
    name: string;
    stats?: StatItem[];
    // Allow other properties to exist without typescript errors
    [key: string]: unknown;
}