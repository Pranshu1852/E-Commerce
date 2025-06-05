import { Link, useSearchParams } from 'react-router-dom';

import useDebounce from '../../../hooks/useDebounce';
import useFetch from '../../../hooks/useFetch';
import { getProducts } from '../../../services/productApis';
import type { FilterQueryType, ProductType } from '../../../types/ProductTypes';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';

function Home() {
  const [searchParams] = useSearchParams();
  const debounceFunc = useDebounce(fetchProducts, 300);
  const {
    data: products,
    isLoading,
    isError,
  } = useFetch(async () => {
    const filterQuery: FilterQueryType = {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      brand: searchParams.get('brand') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      sort: searchParams.get('sort') || '',
    };

    return await debounceFunc(filterQuery);
  }, [searchParams]);

  async function fetchProducts(
    filterQuery: FilterQueryType
  ): Promise<{ data: ProductType[] }> {
    try {
      const response = await getProducts(filterQuery);

      return {
        data: response.data,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  if (isLoading || isError || !products) {
    return;
  }

  return (
    <div className='flex flex-col gap-10 px-10 w-full'>
      <FilterBar />
      <div className='grid grid-cols-autofill-250 gap-10'>
        {products.map((product, index) => {
          return (
            <Link key={index} to={`/products/${product.documentId}`}>
              <ProductCard
                title={product.title}
                description={product.description}
                image={product.image.url}
                price={product.price}
                rating={product.rating}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
