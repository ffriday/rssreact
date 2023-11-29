import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { RootLayout } from '../layouts/rootLayout';
import { ErrorPage } from '../error/ErrorPage';
import { Container } from '../container/container';
import { QueryParams } from '../constants';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<Container />} errorElement={<ErrorPage />} />
      <Route
        path={`/:${QueryParams.page}`}
        element={<Container />}
        errorElement={<ErrorPage />}
      />
      <Route path="/*" element={<ErrorPage />} />
    </Route>
  )
);
