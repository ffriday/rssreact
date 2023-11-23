import { LSKey, QueryParams } from '../constants/types';

export const loadLastSearch = (): string =>
  window.localStorage.getItem(LSKey.lastSearch) ?? '';

export const loadPaseSize = (): string =>
  window.localStorage.getItem(LSKey.pageSize) ?? QueryParams.defaultPageSize;

export const getQuery = (query: string | string[] | undefined): string => 
  query === undefined ? '' : typeof query === 'string' ? query : query[0];
