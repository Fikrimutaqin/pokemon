// Core React
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
    // State for debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Set timeout to update the debounced value
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        // Clear timeout if value changes
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    // Return debounced value
    return debouncedValue;
}
