import { ReadonlyURLSearchParams } from 'next/navigation';
import { LSKey, QueryParams } from '../constants/types';
import { ParsedUrlQuery } from 'querystring';

export const loadLastSearch = (): string =>
  window.localStorage.getItem(LSKey.lastSearch) ?? '';

export const loadPaseSize = (): string =>
  window.localStorage.getItem(LSKey.pageSize) ?? QueryParams.defaultPageSize;

export const getQuery = (query: string | string[] | undefined): string =>
  query === undefined ? '' : typeof query === 'string' ? query : query[0];

export const getSearchParams = (query: ParsedUrlQuery) =>
  ({ uid: getQuery(query[QueryParams.uid]), pageNumber: getQuery(query[QueryParams.pageNumber]), pageSize: getQuery(query[QueryParams.pageSize]) });

export const paramsString = (urlParams: Record<string, string>): string =>
  Object.entries(urlParams).reduce<string[]>((acc, [key, value]) => {
    if (value) acc.push(`${key}=${value}`)
    return acc;
  }, []).join('&');