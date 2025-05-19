
import { useEffect, DependencyList } from 'react';

/**
 * Hook that debounces effect callbacks
 * 
 * @param effect Effect callback to be debounced
 * @param deps Effect dependency array
 * @param delay Delay in milliseconds
 */
export function useDebounceEffect(
  effect: () => void | (() => void), 
  deps: DependencyList, 
  delay: number = 500
): void {
  useEffect(() => {
    // Set up the timeout
    const handler = setTimeout(() => {
      effect();
    }, delay);

    // Clean up the timeout
    return () => {
      clearTimeout(handler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
}
