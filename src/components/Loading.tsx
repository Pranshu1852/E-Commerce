import { Backdrop, CircularProgress } from '@mui/material';

function Loading() {
  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={true}
      >
        <CircularProgress
          sx={{
            color: '#0891b2',
          }}
          size={100}
        />
      </Backdrop>
    </div>
  );
}

export default Loading;
