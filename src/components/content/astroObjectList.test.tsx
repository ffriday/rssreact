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
import { QueryParams, TErrorInfo } from '../constants/types';
import { handlers } from '../tests/mockHandlers';
import { renderWithProviders } from '../tests/renderer';
import { createMockRouter } from '../tests/mockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import HomeRoute from '@/pages/[search]';

const sizeArray = [5, 20];
const query = 'NoResultsQuery';

const server = setupServer(...handlers);
let router = createMockRouter({});

describe('ObjectList', async () => {
  beforeAll(() => server.listen());
  beforeEach(() => {
    router = createMockRouter({ pathname: '/' });
    renderWithProviders(
      <RouterContext.Provider value={router}>
        <HomeRoute searchQuery={''} urlParams={{}} />
      </RouterContext.Provider>
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
    it(`Changes to ${size} cards after pageSize change`, async () => {
      const sizeSelct = await screen.findByRole('combobox');

      await act(async () => {
        fireEvent.change(sizeSelct, { target: { value: size.toString() } });
      });

      expect(router.push).toBeCalledTimes(1);
      expect(router.push).toBeCalledWith({
        pathname: '',
        query: {
          pageNumber: 0,
          pageSize: size,
          uid: '',
        },
      });
    });
  });
});

describe('ObjectList', async () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  sizeArray.forEach((size) => {
    it(`Loads ${size} cards`, async () => {
      router = createMockRouter({ query: { pageSize: size.toString() } });
      renderWithProviders(
        <RouterContext.Provider value={router}>
          <HomeRoute searchQuery={''} urlParams={{}} />
        </RouterContext.Provider>
      );

      const list = await screen.findByRole('list');
      const items = list.querySelectorAll('li');
      expect(items.length === size).toBeTruthy();
    });
  });

  it(`Shows "${TErrorInfo.empty}" message`, async () => {
      router = createMockRouter({ query: { search: query } });
      renderWithProviders(
        <RouterContext.Provider value={router}>
          <HomeRoute searchQuery={''} urlParams={{}} />
        </RouterContext.Provider>
      );

    const message = await screen.findByText(TErrorInfo.empty);
    expect(message).toBeTruthy();
  });
});
