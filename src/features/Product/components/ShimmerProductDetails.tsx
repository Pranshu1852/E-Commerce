import { Skeleton, useTheme } from '@mui/material';

function ShimmerProductDetails() {
  const theme = useTheme();
  return (
    <div className='flex flex-col md:flex-row min-w-[70%] max-w-[1400px] p-5 m-7 lg:m-auto gap-10 shadow-md rounded-md'>
      <Skeleton
        variant='rounded'
        sx={{
          height: '400px',
          [theme.breakpoints.up('md')]: {
            minWidth: '55%',
            height: '700px',
          },
        }}
      />
      <div className='flex flex-col gap-10 w-full'>
        <div className='flex flex-col gap-2 w-full'>
          <Skeleton variant='rounded' height={100} />
          <div className='flex flex-row gap-2 items-center w-full'>
            <span className='text-white bg-cyan-700 py-1 px-2 rounded-md'>
              <Skeleton variant='rounded' height={20} width={100} />
            </span>
            <span className='text-white bg-cyan-700 py-1 px-2 rounded-md'>
              <Skeleton variant='rounded' height={20} width={100} />
            </span>
          </div>
        </div>

        <Skeleton variant='rounded' height={50} />
        <Skeleton variant='rounded' height={200} />
      </div>
    </div>
  );
}

export default ShimmerProductDetails;
