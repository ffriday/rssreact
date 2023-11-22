import { isRouteErrorResponse } from 'react-router-dom';
import { LSKey, QueryParams } from '../constants/types';

export const loadLastSearch = (): string =>
  window.localStorage.getItem(LSKey.lastSearch) ?? '';

export const loadPaseSize = (): string =>
  window.localStorage.getItem(LSKey.pageSize) ?? QueryParams.defaultPageSize;

export const getErrorMessage = (error: unknown) => {
  let message = '';
  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  }
  return message;
};
