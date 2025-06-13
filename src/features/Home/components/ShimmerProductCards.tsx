import { Skeleton } from '@mui/material';

function ShimmerProductCards() {
  return (
    <div className='grid grid-cols-autofill-250 gap-10'>
      {[1, 2, 3, 4].map((_, ind) => {
        return (
          <div
            key={ind}
            className='flex flex-col shadow-md rounded-md hover:shadow-lg transition-all duration-150'
          >
            <div className='overflow-hidden'>
              <Skeleton variant='rounded' height={'288px'} />
            </div>
            <div className='flex flex-col gap-4 p-4'>
              <div className='flex flex-row justify-between items-center'>
                <Skeleton variant='rounded' height={30} width={100} />
              </div>
              <Skeleton variant='rounded' height={20} />
              <div className='flex flex-row justify-between items-center'>
                <Skeleton variant='rounded' height={30} width={80} />
                <Skeleton variant='rounded' height={30} width={100} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShimmerProductCards;
