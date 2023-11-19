import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers/Router';
import { Provider } from 'react-redux';
import { store } from './store';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
