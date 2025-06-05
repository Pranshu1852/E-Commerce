import { Rating, Skeleton } from '@mui/material';
import { useState } from 'react';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
}

function ProductCard({
  title,
  description,
  image,
  price,
  rating,
}: ProductCardProps) {
  const [isImageLoad, setIsImageLoad] = useState(false);

  return (
    <div className='flex flex-col shadow-md rounded-md hover:shadow-lg transition-all duration-150'>
      <div className='overflow-hidden'>
        {!isImageLoad && <Skeleton variant='rounded' height={'288px'} />}
        <img
          className={`rounded-t-md ${isImageLoad ? 'block' : 'opacity-0'} h-72 object-cover w-full hover:scale-105 transition-all duration-150`}
          src={image}
          alt={title}
          loading='lazy'
          onLoad={() => {
            setIsImageLoad(true);
          }}
        />
      </div>
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-2xl font-semibold truncate' title={title}>
            {title}
          </h2>
        </div>
        <p className='font-medium text-stone-500 truncate' title={description}>
          {description}
        </p>
        <div className='flex flex-row justify-between items-center'>
          <span className='text-2xl font-semibold text-cyan-500'>
            &#8377; {price}
          </span>
          <div className='flex flex-row items-center gap-2'>
            <Rating
              name='read-only'
              value={rating}
              precision={0.5}
              size='small'
              readOnly
            />
            <span className='text-sm'>({rating})</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
