/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { act, fireEvent, render, screen } from '@testing-library/react';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import { router } from '../routers/Router';
import { handlers } from '../tests/mockHandlers';
import { mockData } from '../tests/mockData';

const server = setupServer(...handlers);
const cardNumber = 0;

describe('ObjectList', async () => {
  beforeAll(() => server.listen());
  beforeEach(() => {
    render(
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    );
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Renders and shows data', async () => {
    const { name, astronomicalObjectType, location } =
      mockData.astronomicalObjects[cardNumber];
    const list = await screen.findByRole('list');
    const item = list.querySelectorAll('li')[cardNumber];
    const loc = location?.name || 'Unknown';

    expect(item.textContent).toContain(name);
    expect(item.textContent).toContain(astronomicalObjectType);
    expect(item.textContent).toContain(location?.name || 'Unknown');
  });
});
