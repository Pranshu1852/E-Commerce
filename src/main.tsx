import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import { store } from './store/store.ts';
import './lib/i18n.ts';
import { NavigationBridgeComponent } from './components/NavigationBridge.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NavigationBridgeComponent />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
