import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import useDebounce from '../../../hooks/useDebounce';
import { getProducts } from '../../../services/productApis';
import type {
  ProductSearchFilterType,
  ProductType,
} from '../../../types/ProductTypes';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchParams] = useSearchParams();
  const debounceFunc = useDebounce<ProductSearchFilterType>(fetchProducts, 300);

  async function fetchProducts(filterQuery: ProductSearchFilterType) {
    try {
      const response = await getProducts(filterQuery);

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const filterQuery: ProductSearchFilterType = {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      brand: searchParams.get('brand') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
    };

    debounceFunc(filterQuery);
  }, [searchParams]);

  return (
    <div className='flex flex-col gap-10'>
      <div className='grid grid-cols-autofill-250 p-10 gap-10'>
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
