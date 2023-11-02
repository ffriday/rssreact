import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import AstroObjectList from '../content/AstroObjectList';
import RootLayout from '../layouts/RootLayout';
import { apiSearchRequest } from '../helpers/helpers';
import { QueryParams } from '../constants/types';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        path={`/:${QueryParams.query}`}
        element={<AstroObjectList />}
        loader={apiSearchRequest}
        errorElement={<AstroObjectList />}
      />
    </Route>
  )
);
