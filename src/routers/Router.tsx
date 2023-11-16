import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import { apiLoadData } from '../helpers/helpers';
import { LSKey, QueryParams, TErrorInfo } from '../constants/types';
import ErrorMessage from '../errorBoundary/errorMessage';
import { Content } from '../content';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      errorElement={<ErrorMessage message={TErrorInfo.sorry} />}
    >
      <Route
        index
        element={
          <Navigate
            to={`/0/${window.localStorage.getItem(LSKey.lastSearch) || ''}?${
              QueryParams.pageSize
            }=${
              window.localStorage.getItem(LSKey.pageSize) ||
              QueryParams.defaultPageSize
            }`}
          />
        }
        errorElement={<Content />}
      />
      <Route
        path={`/:${QueryParams.pageNumber}/:${QueryParams.query}?`}
        element={<Content />}
        loader={apiLoadData}
        errorElement={<Content />}
      />
      <Route
        path="/*"
        element={<ErrorMessage message={TErrorInfo.notFound} />}
        errorElement={<Content />}
      />
    </Route>
  )
);
