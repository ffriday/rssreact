import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import AstroObjectList from '../content/AstroObjectList';
import RootLayout from '../layouts/RootLayout';
import { apiSearchRequest } from '../helpers/helpers';
import { QueryParams } from '../constants/types';
import ErrorMessage from '../errorBoundary/errorMessage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorMessage />}>
      <Route
        path={`/:${QueryParams.query}`}
        element={<AstroObjectList />}
        loader={apiSearchRequest}
        errorElement={<AstroObjectList />}
      />
    </Route>
  )
);
