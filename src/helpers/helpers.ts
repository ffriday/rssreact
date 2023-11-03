import {
  LoaderFunctionArgs,
  defer,
  isRouteErrorResponse,
} from 'react-router-dom';
import { apiEnv } from '../constants/env';
import { LSKey, QueryParams } from '../constants/types';

export const initialSearchContextState = {
  queryParams: {
    firstPage: false,
    lastPage: false,
    numberOfElements: 0,
    pageNumber: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
  },
  uid: '',
};

export const loadLastSearch = (): string =>
  window.localStorage.getItem(LSKey.lastSearch) ?? '';

const apiLoadSearch = async (
  query: string,
  page?: string | undefined,
  size?: string | undefined
) => {
  const pageNumber = page ? `&pageNumber=${page}` : '';
  const pageSize = size
    ? `&pageSize=${size}`
    : `&pageSize=${QueryParams.defaultPageSize}`;
  const url = `${apiEnv.url}${apiEnv.endpoint}${apiEnv.search}?name=${query}${pageSize}${pageNumber}`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((data) => data.json());
};

const apiLoadItem = async (uid: string) => {
  const url = `${apiEnv.url}${apiEnv.endpoint}?uid=${uid}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((data) => data.json());
};

export const apiLoadData = async ({ params }: LoaderFunctionArgs) => {
  const search = apiLoadSearch(
    params[QueryParams.query] || '',
    params[QueryParams.pageNumber],
    params[QueryParams.pageSize]
  );
  let item = {};
  if (params[QueryParams.uid]) item = apiLoadItem(params[QueryParams.uid]);
  return defer({ list: search, item: item });
};

export const getErrorMessage = (error: unknown) => {
  let message = '';
  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  }
  return message;
};
