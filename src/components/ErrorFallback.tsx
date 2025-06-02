function ErrorFallBack({
  error,
  resetErrorBoundary,
}: {
  error: string;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className='flex flex-col gap-10 items-center justify-center m-auto h-[100vh] w-full'>
      <h2 className='text-6xl text-center'>
        Error: <span className='text-red-600'>{error}</span>
      </h2>
      <button
        className='py-5 px-10 bg-slate-400 text-2xl font-bold text-white rounded-xl'
        onClick={resetErrorBoundary}
      >
        Go Home
      </button>
    </div>
  );
}

export default ErrorFallBack;
