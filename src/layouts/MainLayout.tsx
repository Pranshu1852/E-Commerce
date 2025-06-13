import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';

function MainLayout() {
  return (
    <div className='flex flex-col gap-10'>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
