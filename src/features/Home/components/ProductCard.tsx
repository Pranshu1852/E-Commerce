import { Rating } from '@mui/material';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
}

function ProductCard({ title, description, price, rating }: ProductCardProps) {
  return (
    <div className='flex flex-col shadow-md rounded-md hover:shadow-lg transition-all duration-150'>
      <div className='overflow-hidden'>
        <img
          className={`rounded-t-md h-72 object-cover w-full hover:scale-105 transition-all duration-150`}
          src={
            'https://res.cloudinary.com/dvaxcfbor/image/upload/w_150,h_150,c_thumb/v1749036368/iphone_16_finish_select_202409_6_1inch_ultramarine_68ab2731fa.webp'
          }
          alt={title}
          loading='eager'
          height={150}
          width={150}
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
