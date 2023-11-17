import { isRouteErrorResponse } from 'react-router-dom';
import { LSKey, TSearchContext } from '../constants/types';

export const initialSearchContextState = (): TSearchContext => ({
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
  itemsPerPage: Number(window.localStorage.getItem(LSKey.pageSize)) || 10,
});

export const loadLastSearch = (): string =>
  window.localStorage.getItem(LSKey.lastSearch) ?? '';

export const getErrorMessage = (error: unknown) => {
  let message = '';
  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  }
  return message;
};
