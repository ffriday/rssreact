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
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import { router } from '../routers/Router';
import { handlers } from '../tests/mockHandlers';
import { TErrorInfo } from '../constants/types';
import { renderWithProviders } from '../tests/renderer';

const valueForInput = 'sun';
let startQuery = 0;

const server = setupServer(...handlers);
server.events.on('request:start', ({ request }) => {
  if (request.method === 'POST') startQuery++;
});

describe('ObjectList', async () => {
  beforeAll(() => server.listen());
  beforeEach(() => {
    renderWithProviders(
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    );
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Renders error button', async () => {
    const errorButton = await screen.findByText('Error');
    expect(errorButton).toBeTruthy();
  });

  it('Shows error page', async () => {
    console.error = (...msg) => {
      msg;
    };
    const errorButton = await screen.findByText('Error');

    act(() => {
      fireEvent.click(errorButton);
    });

    const errorMessage = await screen.findByText(TErrorInfo.sorry);

    expect(errorMessage).toBeTruthy();
  });

  it('Search works with "Enter" button', async () => {
    const input = screen.getByRole('searchbox');

    act(() => {
      fireEvent.change(input, { target: { value: valueForInput } });
      fireEvent.keyUp(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    });

    await waitFor(() => expect(startQuery > 1).toBeTruthy());
  });
});
