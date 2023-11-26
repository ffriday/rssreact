import { setupServer } from 'msw/node';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
} from 'vitest';
import { act, fireEvent, screen } from '@testing-library/react';
import { handlers } from '../tests/mockHandlers';
import { renderWithProviders } from '../tests/renderer';
import { createMockRouter } from '../tests/mockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Home from '@/pages';

const testUid = 'ASMA0000015822';
const size = '10';
const page = '0';
const valueForInput = 'test-text';
const search = 'sun';

const server = setupServer(...handlers);
let router = createMockRouter({});

describe('Search', async () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Renders', async () => {
    router = createMockRouter({pathname: search, query: {uid: testUid, search: search}});
    renderWithProviders(
      <RouterContext.Provider value={router}>
        <Home searchQuery={search} urlParams={{uid: testUid, search: search}} />
      </RouterContext.Provider>
    );
    const searchButton = screen.getAllByRole('button')[0];
    const input = screen.getByRole('searchbox');

    expect(searchButton).not.toBeNull();
    expect(input).not.toBeNull();
  });

  it('Invokes search', async () => {
    router = createMockRouter({ query: { search: '', pageSize: size, pageNumber: page } });
    renderWithProviders(
      <RouterContext.Provider value={router}>
        <Home searchQuery={''} urlParams={{}} />
      </RouterContext.Provider>
    );
    const searchButton = screen.getAllByRole('button')[0];
    const input = screen.getByRole('searchbox');

    act(() => {
      fireEvent.change(input, { target: { value: valueForInput } });
      fireEvent.click(searchButton);
    });

    expect(router.push).toBeCalledTimes(1);
    expect(router.push).toBeCalledWith({
      pathname: valueForInput,
      query: {
        pageNumber: +page,
        pageSize: size,
        uid: '',
      },
    });
  });
});
