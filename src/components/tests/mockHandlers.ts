import { http, HttpResponse } from 'msw';
import { apiEnv } from '../constants/env';
import { QueryParams } from '../constants/types';
import { mockCardData, mockData } from './mockData';

const endpointSearch = `${apiEnv.url}${apiEnv.endpoint}${apiEnv.search}`;
const endpointItem = `${apiEnv.url}${apiEnv.endpoint}`;

export const handlers = [
  http.post(endpointSearch, ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');
    const pageSize = url.searchParams.get(QueryParams.pageSize);
    const pageNumber = url.searchParams.get(QueryParams.pageNumber);
    const mock = mockData.astronomicalObjects.filter(
      (_, i) => i < Number(pageSize)
    );

    const res = name
      ? {
          astronomicalObjects: mock,
          page: {
            pageNumber: 0,
            pageSize: 10,
            numberOfElements: 0,
            totalElements: 0,
            totalPages: 0,
            firstPage: true,
            lastPage: false,
          },
        }
      : {
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
        };

    return HttpResponse.json(res);
  }),
  http.get(endpointItem, ({ request }) => {
    const url = new URL(request.url);
    const uid = url.searchParams.get(QueryParams.uid);
    const data = mockCardData.find(
      ({ astronomicalObject }) => astronomicalObject.uid === uid
    );
    const res = data ? data : { astronomicalObject: null };

    return HttpResponse.json(res);
  }),
];
