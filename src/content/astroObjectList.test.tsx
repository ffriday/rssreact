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
import { QueryParams, TErrorInfo } from '../constants/types';
import { handlers } from '../tests/mockHandlers';
import { renderWithProviders } from '../tests/renderer';

const sizeArray = [5, 20];
const query = 'NoResultsQuery';

const server = setupServer(...handlers);

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

  it('Loads default amount of mock data', async () => {
    const list = await screen.findByRole('list');
    const cards = list.querySelectorAll('li');
    expect(cards.length === Number(QueryParams.defaultPageSize)).toBeTruthy();
  });

  sizeArray.forEach((size) => {
    it(`Loads ${size} cards after pageSize change`, async () => {
      const sizeSelct = await screen.findByRole('combobox');

      await act(async () => {
        fireEvent.change(sizeSelct, { target: { value: size.toString() } });
      });

      const list = await screen.findByRole('list');
      const items = list.querySelectorAll('li');
      expect(items.length === size).toBeTruthy();
    });
  });

  it(`Shows "${TErrorInfo.empty}" message`, async () => {
    const searchButton = await screen.findByText('Search');
    const input = await screen.findByRole('searchbox');

    act(() => {
      fireEvent.change(input, { target: { value: query } });
      fireEvent.click(searchButton);
    });

    const message = await screen.findByText(TErrorInfo.empty);
    expect(message).toBeTruthy();
  });
});
