import { describe, it, expect } from 'vitest';
import { pokemonColorService } from '../pokemonColorService';

describe('Pokemon Color Service', () => {
  // basic test to make sure we get the right hex colors back
  it('should return correct hex color for known types', () => {
    expect(pokemonColorService.getColorByType('fire')).toBe('#EF4444'); // red for fire
    expect(pokemonColorService.getColorByType('water')).toBe('#3B82F6'); // blue for water
    expect(pokemonColorService.getColorByType('grass')).toBe('#22C55E'); // green for grass
    expect(pokemonColorService.getColorByType('electric')).toBe('#EAB308'); // yellow for electric
  });

  // if the API randomly sends uppercase types, we shouldn't crash
  it('should handle uppercase types correctly', () => {
    expect(pokemonColorService.getColorByType('FIRE')).toBe('#EF4444');
    expect(pokemonColorService.getColorByType('WaTeR')).toBe('#3B82F6');
  });

  // if we get a weird type that isn't mapped, just fall back
  // to a safe default gray color so the UI doesn't break
  it('should return default color for unknown types', () => {
    const defaultColor = '#374151'; // fallback gray color
    expect(pokemonColorService.getColorByType('weird_alien_type')).toBe(defaultColor);
    expect(pokemonColorService.getColorByType('')).toBe(defaultColor);
  });
});
