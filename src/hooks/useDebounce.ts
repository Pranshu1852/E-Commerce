import { useEffect, useRef } from 'react';

function useDebounce<T>(func: (args: T) => void, delay: number) {
  const timer = useRef<number | undefined>(undefined);

  const debounceFunc = function (newArgs: T) {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      func(newArgs);
    }, delay);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return debounceFunc;
}

export default useDebounce;
