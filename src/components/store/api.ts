import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper'
import { apiEnv } from '../constants/env';
import {
  QueryParams,
  TSearchResponse,
  WrappedAstroObject,
} from '../constants/types';

export type TSearchArgs = {
  query: string;
  page?: string;
  size?: string;
};

type TUid = {
  uid: string;
};

export const api = createApi({
  reducerPath: 'astroObject',
  baseQuery: fetchBaseQuery({ baseUrl: apiEnv.url }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (build) => ({
    getItem: build.query<WrappedAstroObject, TUid>({
      query: ({ uid }) => `${apiEnv.endpoint}?uid=${uid}`,
    }),
    getSearch: build.query<TSearchResponse, TSearchArgs>({
      query: ({
        query = '',
        size = QueryParams.defaultPageSize,
        page = '1',
      }) => ({
        url: `${apiEnv.endpoint}${apiEnv.search}?name=${query}&pageSize=${size}&pageNumber=${page}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    }),
  }),
});

export const { useGetItemQuery, useGetSearchQuery, util: { getRunningQueriesThunk } } = api;
export const { getItem, getSearch } = api.endpoints;
