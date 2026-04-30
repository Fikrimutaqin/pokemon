// Components
import BasicInput from '../common/inputs/BasicInput';
// Types
import { SearchSectionProps } from '@/types/SearchType';
// Icons
import { Search } from 'lucide-react';

export default function SearchSection({ value, onChange }: SearchSectionProps) {
    return (
        <section id="search" className="flex flex-col justify-center items-center w-full py-10 px-4 space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
                What Pokemon are you looking for?
            </h2>

            <div className="relative w-full max-w-2xl group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                </div>

                <BasicInput
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                    type="text"
                    placeholder="Search for Pokémon, abilities, or types..."
                    className="block w-full py-5 pl-14 pr-5 bg-white border-none rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none text-slate-600 placeholder:text-slate-400 text-lg transition-all"
                />
            </div>
        </section>
    );
}