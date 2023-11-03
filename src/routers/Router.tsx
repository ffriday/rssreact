import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import { apiSearchRequest } from '../helpers/helpers';
import { QueryParams } from '../constants/types';
import ErrorMessage from '../errorBoundary/errorMessage';
import Content from '../content/Content';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorMessage />}>
      <Route
        path={`/:${QueryParams.query}`}
        element={<Content />}
        loader={apiSearchRequest}
        errorElement={<Content />}
      />
      <Route
        path={`/:${QueryParams.query}/:${QueryParams.pageNumber}`}
        element={<Content />}
        loader={apiSearchRequest}
        errorElement={<Content />}
      />
    </Route>
  )
);
