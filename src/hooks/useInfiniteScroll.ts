// Core React
import { useEffect, useRef } from 'react';

export function useInfiniteScroll(onLoadMore: () => void, hasMore: boolean) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [onLoadMore, hasMore]);

  return { observerTarget };
}
