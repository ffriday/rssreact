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

const server = setupServer(...handlers);
let router = createMockRouter({});

describe('AstroItem', async () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Loads card', async () => {
    router = createMockRouter({query: { uid: testUid }});
    renderWithProviders(
      <RouterContext.Provider value={router}>
        <Home searchQuery={''} urlParams={{uid: testUid}} />
      </RouterContext.Provider>
    );
    const card = await screen.findByTestId('card-element');
    expect(card).toBeTruthy();
  });

  it('Invokes card loading after click', async () => {
    router = createMockRouter({ query: { search: '', pageSize: size, pageNumber: page } });
    renderWithProviders(
      <RouterContext.Provider value={router}>
        <Home searchQuery={''} urlParams={{}} />
      </RouterContext.Provider>
    );
    const list = await screen.findByRole('list');
    const item = list.querySelectorAll('li')[0];

    act(() => {
      fireEvent.click(item);
    });

    expect(router.push).toBeCalledTimes(1);
    expect(router.push).toBeCalledWith({
      pathname: '',
      query: {
        pageNumber: page,
        pageSize: size,
        uid: testUid,
      },
    });
  });

  it('Closes card loading after click', async () => {
    router = createMockRouter({ query: { search: '', pageSize: size, pageNumber: page, uid: testUid }} );
    renderWithProviders(
      <RouterContext.Provider value={router}>
        <Home searchQuery={''} urlParams={{uid: testUid}} />
      </RouterContext.Provider>
    );
    const closeButton = await screen.findByText('Close');

    act(() => {
      fireEvent.click(closeButton);
    });

    expect(router.push).toBeCalledTimes(1);
    expect(router.push).toBeCalledWith({
      pathname: '',
      query: {
        pageNumber: page,
        pageSize: size,
        uid: '',
      },
    });
  });
});
