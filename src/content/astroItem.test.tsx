import { setupServer } from 'msw/node';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';
import { act, fireEvent, screen } from '@testing-library/react';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import { router } from '../routers/Router';
import { handlers } from '../tests/mockHandlers';
import { TErrorInfo } from '../constants/types';
import { renderWithProviders } from '../tests/renderer';

const cardNumber: 0 | 1 | 2 = 1;

const server = setupServer(...handlers);

describe('Object card', async () => {
  beforeAll(() => server.listen());
  beforeEach(async () => {
    renderWithProviders(
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    );
    const list = await screen.findByRole('list');
    const item = list.querySelectorAll('li')[cardNumber];
    act(() => {
      fireEvent.click(item);
    });
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Shows loader', async () => {
    const list = await screen.findByRole('list');
    const item = list.querySelectorAll('li')[cardNumber];

    act(() => {
      fireEvent.click(item);
    });

    const loader = await screen.findByText(TErrorInfo.loading);

    expect(loader).toBeTruthy();
  });

  it('Closes on button click', async () => {
    const closeButton = await screen.findByText('Close');

    act(() => {
      fireEvent.click(closeButton);
    });

    const card = screen.queryByTestId('card-element');

    expect(card).not.toBeTruthy();
  });

  it('Closes on left panel click', async () => {
    const [, nav] = await screen.findAllByRole('navigation');

    act(() => {
      fireEvent.click(nav);
    });

    const card = screen.queryByTestId('card-element');

    expect(card).not.toBeTruthy();
  });
});
