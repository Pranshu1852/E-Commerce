import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import ErrorFallBack from './components/ErrorFallback';
import NotFound from './components/NotFound';
import Login from './features/Authentication/pages/Login';
import Signup from './features/Authentication/pages/Signup';
import Home from './features/Home/pages/Home';
import ProductDetails from './features/Product/pages/ProductDetails';
import MainLayout from './layouts/MainLayout';
import type { StateType } from './store/store';
import { sharedRef } from './utils/sharedRef';
import AuthWrapper from './wrapper/AuthWrapper';

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
    <ErrorBoundary
      fallbackRender={ErrorFallBack}
      onReset={() => {
        if (sharedRef.current) {
          sharedRef.current.navigate('/');
        }
      }}
    >
      <div className='min-h-screen'>
        <Toaster />
        <Routes>
          <Route
            path='/'
            element={
              <AuthWrapper>
                <MainLayout />
              </AuthWrapper>
            }
          >
            <Route index element={<Home />} />
            <Route path='/products/:id' element={<ProductDetails />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
