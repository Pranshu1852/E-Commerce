import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import NotFound from './components/NotFound';
import Login from './features/Authentication/pages/Login';
import Signup from './features/Authentication/pages/Signup';
import MainLayout from './layouts/MainLayout';
import type { StateType } from './store/store';

function App() {
  const { i18n } = useTranslation();

  const { language } = useSelector((state: StateType) => {
    return {
      language: state.general.language,
    };
  });

  useEffect(() => {
    i18n.changeLanguage(language);
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language, language]);

  return (
    <div className='min-h-screen'>
      <Toaster />
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<h1>Home</h1>} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
