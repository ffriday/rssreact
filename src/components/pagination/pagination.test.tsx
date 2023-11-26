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
import { handlers } from '../tests/mockHandlers';
import { renderWithProviders } from '../tests/renderer';
import { createMockRouter } from '../tests/mockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Home from '@/pages';

const size = '10';
const page = '0';
const valueForInput = 'test-text';

const server = setupServer(...handlers);
let router = createMockRouter({});

describe('Pagination', async () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  beforeEach(() => {
    router = createMockRouter({ pathname: '/', query: {pageNumber: page, pageSize: size} });
    renderWithProviders(
      <RouterContext.Provider value={router}>
        <Home searchQuery={''} urlParams={{pageNumber: page, pageSize: size}} />
      </RouterContext.Provider>
    );
  });
  afterAll(() => server.close());

  it('Renders', async () => {
    expect(screen.findByLabelText('Items:')).not.toBeNull();
  });

  it('Changes url', async () => {
    const prev = await screen.findByText('<-');
    const next = await screen.findByText('->');

    act(() => {
      fireEvent.click(next);
    });

    expect(router.push).toBeCalledTimes(1);
    expect(router.push).toBeCalledWith({
      pathname: '',
      query: {
        pageNumber: +page + 1,
        pageSize: size,
        uid: '',
      },
    });
  });

  // it('Invokes search', async () => {
  //   router = createMockRouter({ query: { search: '', pageSize: size, pageNumber: page } });
  //   renderWithProviders(
  //     <RouterContext.Provider value={router}>
  //       <Home searchQuery={''} urlParams={{}} />
  //     </RouterContext.Provider>
  //   );
  //   const searchButton = screen.getAllByRole('button')[0];
  //   const input = screen.getByRole('searchbox');

  //   act(() => {
  //     fireEvent.change(input, { target: { value: valueForInput } });
  //     fireEvent.click(searchButton);
  //   });

  //   expect(router.push).toBeCalledTimes(1);
  //   expect(router.push).toBeCalledWith({
  //     pathname: valueForInput,
  //     query: {
  //       pageNumber: +page,
  //       pageSize: size,
  //       uid: '',
  //     },
  //   });
  // });
});
