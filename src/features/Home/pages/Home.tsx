import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAllProducts } from '../../../services/productApis';
import type { ProductType } from '../../../types/ProductTypes';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);

  async function fetchProducts() {
    try {
      const response = await getAllProducts();

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [products]);

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
