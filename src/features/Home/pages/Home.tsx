import { useErrorBoundary } from 'react-error-boundary';
import { Link, useSearchParams } from 'react-router-dom';

import useDebounce from '../../../hooks/useDebounce';
import useFetch from '../../../hooks/useFetch';
import { getProducts } from '../../../services/productApis';
import type { FilterQueryType, ProductType } from '../../../types/ProductTypes';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';
import ShimmerProductCards from '../components/ShimmerProductCards';

function Home() {
  const [searchParams] = useSearchParams();
  const { showBoundary } = useErrorBoundary();
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

  if (isError) {
    showBoundary('Something Went Wrong.');
  }

  return (
    <div className='flex flex-col gap-10 px-10 w-full'>
      <FilterBar />
      {isLoading ? (
        <ShimmerProductCards />
      ) : products && products.length !== 0 ? (
        <div className='grid grid-cols-autofill-250 gap-10'>
          {products.map((product, index) => {
            return (
              <Link key={index} to={`/products/${product.documentId}`}>
                <ProductCard
                  title={product.title ?? 'Product Title Not exist.'}
                  description={
                    product.description ?? 'Product description not exist.'
                  }
                  image={
                    product.image.url ??
                    'https://www.incathlab.com/images/products/default_product.png'
                  }
                  price={product.price ?? 'Price Not exist.'}
                  rating={product.rating ?? 0}
                />
              </Link>
            );
          })}
        </div>
      ) : (
        <h2 className='text-3xl font-semibold m-auto mt-10'>
          There are no Products available.
        </h2>
      )}
    </div>
  );
}

export default Home;
