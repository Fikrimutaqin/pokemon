import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce Custom Hook', () => {
  // use vitest's fake timers so we don't actually have to wait
  // around for 500ms in real time during our tests
  beforeEach(() => {
    vi.useFakeTimers();
  });

  // don't forget to put the real timers back when we're done!
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should update the value only after the specified delay', () => {
    // start the hook with an initial value of 'pikachu' and a 500ms delay
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'pikachu', delay: 500 } }
    );

    // on the very first render, the value should be set immediately
    expect(result.current).toBe('pikachu');

    // suddenly the user types really fast and changes it to 'bulbasaur'
    rerender({ value: 'bulbasaur', delay: 500 });

    // because 500ms hasn't passed yet, the hook should still be holding onto 'pikachu'
    expect(result.current).toBe('pikachu');

    // fast forward our fake clock by 499ms (almost there!)
    act(() => {
      vi.advanceTimersByTime(499);
    });
    // nope, still holding onto 'pikachu'
    expect(result.current).toBe('pikachu');

    // add 1 more millisecond so we hit exactly 500ms
    act(() => {
      vi.advanceTimersByTime(1);
    });

    // the timeout finally fired, so the value should now be 'bulbasaur'
    expect(result.current).toBe('bulbasaur');
  });
});
