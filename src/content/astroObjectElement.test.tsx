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
import { mockData } from '../tests/mockData';
import { renderWithProviders } from '../tests/renderer';

const cardNumber: 0 | 1 | 2 = 0;
const { name, astronomicalObjectType, location } =
  mockData.astronomicalObjects[cardNumber];
let startQuery = false;

const server = setupServer(...handlers);
server.events.on('request:start', ({ request }) => {
  if (request.method === 'GET') startQuery = true;
});

describe('List item', async () => {
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

  it('Renders and shows data', async () => {
    const list = await screen.findAllByRole('listitem');
    const item = list[cardNumber];

    expect(item.textContent).toContain(name);
    expect(item.textContent).toContain(astronomicalObjectType);
    expect(item.textContent).toContain(location?.name || 'Unknown');
  });

  it('Opens detailed card', async () => {
    const list = await screen.findAllByRole('listitem');
    const item = list[cardNumber];

    act(() => {
      fireEvent.click(item);
    });

    const card = await screen.findByTestId('card-element');

    expect(card).toBeTruthy();
  });

  it('Makes fetch', async () => {
    const list = await screen.findAllByRole('listitem');
    const item = list[cardNumber];

    act(() => {
      fireEvent.click(item);
    });

    await waitFor(() => expect(startQuery).toBeTruthy());
  });
});
