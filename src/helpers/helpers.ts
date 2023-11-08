import {
  LoaderFunctionArgs,
  defer,
  isRouteErrorResponse,
} from 'react-router-dom';
import { apiEnv } from '../constants/env';
import {
  LSKey,
  QueryParams,
  TSearchContext,
  TSearchResponse,
  WrappedAstroObject,
} from '../constants/types';

export const initialSearchContextState: TSearchContext = {
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
  itemsPerPage: 10,
};

export const loadLastSearch = (): string =>
  window.localStorage.getItem(LSKey.lastSearch) ?? '';

const apiLoadSearch = async (
  query: string,
  page?: string | undefined,
  size?: string | undefined | null
): Promise<TSearchResponse> => {
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

const apiLoadItem = async (uid: string): Promise<WrappedAstroObject> => {
  const url = `${apiEnv.url}${apiEnv.endpoint}?uid=${uid}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((data) => data.json());
};

export const apiLoadData = async ({ params, request }: LoaderFunctionArgs) => {
  const uid = new URL(request.url).searchParams.get(QueryParams.uid);
  const itemsPerPage = new URL(request.url).searchParams.get(
    QueryParams.pageSize
  );
  const search = apiLoadSearch(
    params[QueryParams.query] || '',
    params[QueryParams.pageNumber],
    itemsPerPage
  );
  if (uid) {
    return defer({ list: search, item: apiLoadItem(uid) });
  } else {
    return defer({ list: search });
  }
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
