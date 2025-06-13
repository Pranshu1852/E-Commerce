import { useRef } from 'react';

function useDebounce<T, U>(func: (args: T) => Promise<U>, delay: number) {
  const timer = useRef<number | undefined>(undefined);

  const debounceFunc = function (newArgs: T): Promise<U> {
    return new Promise((resolve, reject) => {
      clearTimeout(timer.current);
      timer.current = setTimeout(async () => {
        try {
          const response = await func(newArgs);

          resolve(response);
        } catch (error) {
          console.error(error);
          reject(error);
        }
      }, delay);
    });
  };

  return debounceFunc;
}

export default useDebounce;
