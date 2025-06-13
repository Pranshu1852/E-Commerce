import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import storageHandler from '../utils/storageHandler';

interface AuthWrapperProps {
  children: ReactNode;
}

function AuthWrapper({ children }: AuthWrapperProps) {
  const isLogin = storageHandler.getStorage('token');

  if (!isLogin) {
    return <Navigate to={'/login'} replace />;
  }

  return children;
}

export default AuthWrapper;
