export interface PokemonType {
    name: string;
    color?: string;
}

export interface PokemonCardProps {
    id: string;
    name: string;
    types: string[];
    imageUrl: string;
    backgroundColor?: string;
    onClick?: () => void;
}
