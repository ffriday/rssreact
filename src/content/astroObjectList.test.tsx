/* eslint-disable @typescript-eslint/no-unused-vars */
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { apiEnv } from '../constants/env';
import { mockData } from '../tests/mockData';
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
import { QueryParams } from '../constants/types';

const endpoint = `${apiEnv.url}${apiEnv.endpoint}${apiEnv.search}`;
const sizeArray = [5, 20];

const handlers = http.post(endpoint, ({ request }) => {
  const url = new URL(request.url);
  const name = url.searchParams.get('name');
  const pageSize = url.searchParams.get(QueryParams.pageSize);
  const pageNumber = url.searchParams.get(QueryParams.pageNumber);
  const mock = mockData.astronomicalObjects.filter(
    (_, i) => i < Number(pageSize)
  );

  return HttpResponse.json({
    astronomicalObjects: mock,
    page: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      numberOfElements: 50,
      totalElements: 2404,
      totalPages: 49,
      firstPage: true,
      lastPage: false,
    },
  });
});

const server = setupServer(handlers);

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
      console.log('>>>>', items.length);
      expect(items.length === size).toBeTruthy();
    });
  });
});
