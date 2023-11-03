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

export const apiSearchRequest = async ({ params }: LoaderFunctionArgs) => {
  const number = params[QueryParams.pageNumber]
    ? `&pageNumber=${params[QueryParams.pageNumber]}`
    : '';
  const size = params[QueryParams.pageSize]
    ? `&pageSize=${params[QueryParams.pageSize]}`
    : `&pageSize=${QueryParams.defaultPageSize}`;
  const uri = `${apiEnv.url}${apiEnv.endpoint}?name=${
    params[QueryParams.query]
  }${size}${number}`;

  const res = fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((data) => data.json());
  return defer({ data: res });
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
