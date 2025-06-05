import { Skeleton } from '@mui/material';

function ShimmerProductDetails() {
  return (
    <div className='flex flex-col md:flex-row max-w-[1400px] p-5 m-7 lg:m-auto gap-10 shadow-md rounded-md'>
      <Skeleton
        variant='rounded'
        sx={{
          width: '100%',
        }}
      />
      <img
        className='w-full object-cover md:min-w-[55%]'
        src={product.image.url}
        alt={product.title}
      />
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-semibold leading-[50px]'>
            {product.title}
          </h2>
          <div className='flex flex-row gap-2 items-center'>
            <span className='text-white bg-cyan-700 py-1 px-2 rounded-md'>
              {product.category.name}
            </span>
            <span className='text-white bg-cyan-700 py-1 px-2 rounded-md'>
              {product.brand.name}
            </span>
          </div>
        </div>

        <span className='text-5xl font-semibold text-cyan-500'>
          &#8377; {product.price}
        </span>
        <p className='text-stone-500 font-medium text-lg leading-8 whitespace-pre text-wrap'>
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default ShimmerProductDetails;
