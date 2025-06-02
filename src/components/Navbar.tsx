import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import LanguageSelector from './LanguageSelector';

function Navbar() {
  const { t } = useTranslation();

  return (
    <div className='bg-cyan-500 shadow-md flex flex-row items-center justify-between py-5 px-10'>
      <Link to='/' className='text-3xl text-white font-bold'>
        {t('logo')}
      </Link>
      <div className='flex flex-row items-center gap-5 font-semibold text-white text-xl'>
        <LanguageSelector />
      </div>
    </div>
  );
}

export default Navbar;
