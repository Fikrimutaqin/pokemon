export type PokemonType = {
    name: string;
    color?: string;
}

export type PokemonCardProps = {
    id: string;
    name: string;
    types: string[];
    imageUrl: string;
    backgroundColor?: string;
    priority?: boolean;
    onClick?: () => void;
}
