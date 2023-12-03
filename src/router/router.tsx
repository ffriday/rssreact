import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { RootLayout } from '../layouts/rootLayout';
import { ErrorPage } from '../error/ErrorPage';
import { Links } from '../constants';
import { FormView } from '../userData/formView';
import { UsualForm } from '../form/usualForm';
import { HookForm } from '../form/hookForm';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<FormView />} errorElement={<ErrorPage />} />
      <Route
        path={`/${Links.componentForm}`}
        element={<UsualForm />}
        errorElement={<ErrorPage />}
      />
      <Route
        path={`/${Links.hookForm}`}
        element={<HookForm />}
        errorElement={<ErrorPage />}
      />
      <Route path="/*" element={<ErrorPage message="Page not found" />} />
    </Route>
  )
);
