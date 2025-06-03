import SearchIcon from '@mui/icons-material/Search';
import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';

import LanguageSelector from './LanguageSelector';

function Navbar() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const searchQuery = event.target.value;

    searchParams.set('search', searchQuery);
    setSearchParams(searchParams);
    if (searchQuery === '') {
      if (searchParams.has('search')) {
        searchParams.delete('search');
        setSearchParams(searchParams);
      }
    }
  }

  return (
    <div className='bg-cyan-500 shadow-md flex flex-row flex-wrap items-center justify-between gap-5 py-5 px-10'>
      <Link to='/' className='text-3xl text-white font-bold'>
        {t('logo')}
      </Link>
      <div className='relative flex flex-row basis-[363px] items-center bg-white flex-1 md:max-w-[600px] rounded-full focus:ring-2 order-1 md:order-none'>
        <SearchIcon
          sx={{
            position: 'absolute',
            left: '10px',
            color: 'gray',
          }}
        />
        <input
          onChange={handleChange}
          className='h-full w-full py-3 rounded-full pl-10 outline-none focus:ring-2 focus:ring-cyan-800'
          type='text'
          placeholder='Search Products...'
        />
      </div>
      <div className='flex flex-row items-center gap-5 font-semibold text-white text-xl'>
        <LanguageSelector />
      </div>
    </div>
  );
}

export default Navbar;
