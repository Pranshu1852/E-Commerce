import { useEffect, useState } from 'react';

type useFetchReturnType<T> = {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
};

function useFetch<T>(
  func: (...args: unknown[]) => Promise<{ data: T }>,
  dependency: unknown[]
): useFetchReturnType<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await func();

        setData(response.data);
      } catch (error) {
        setIsError(true);
        console.error('Error: ', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [...dependency]);

  return { data, isLoading, isError };
}

export default useFetch;
