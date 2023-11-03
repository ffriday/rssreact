import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import { apiLoadData } from '../helpers/helpers';
import { QueryParams } from '../constants/types';
import ErrorMessage from '../errorBoundary/errorMessage';
import Content from '../content/Content';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorMessage />}>
      <Route index element={<Navigate to="/0" />} errorElement={<Content />} />
      <Route
        path={`/:${QueryParams.pageNumber}/:${QueryParams.query}?/:${QueryParams.uid}?`}
        element={<Content />}
        loader={apiLoadData}
        errorElement={<Content />}
      />
    </Route>
  )
);
