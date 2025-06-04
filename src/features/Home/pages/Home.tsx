import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import useDebounce from '../../../hooks/useDebounce';
import { getProducts } from '../../../services/productApis';
import type { FilterQueryType, ProductType } from '../../../types/ProductTypes';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchParams] = useSearchParams();
  const debounceFunc = useDebounce<FilterQueryType>(fetchProducts, 300);

  async function fetchProducts(filterQuery: FilterQueryType) {
    try {
      const response = await getProducts(filterQuery);

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const filterQuery: FilterQueryType = {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      brand: searchParams.get('brand') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      sort: searchParams.get('sort') || '',
    };

    debounceFunc(filterQuery);
  }, [searchParams]);

  return (
    <div className='flex flex-col gap-10  p-10 w-full'>
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
