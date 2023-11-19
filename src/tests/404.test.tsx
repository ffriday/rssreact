import { act, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { expect, it } from 'vitest';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { router } from '../routers/Router';
import { TErrorInfo } from '../constants/types';
import { renderWithProviders } from './renderer';

const wrongRoute = `${import.meta.env.BASE_URL}0/test/wrongRoute?123`;

it('Renders 404 page', async () => {
  renderWithProviders(
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );

  await act(async () => router.navigate(wrongRoute));

  const element = screen.queryByText(TErrorInfo.notFound);

  expect(element).not.toBeNull();
});
