import { QueryParams } from '../constants/types';
import { ParsedUrlQuery } from 'querystring';

export const parseParam = (query: string | string[] | undefined): string =>
  query === undefined ? '' : typeof query === 'string' ? query : query[0];

export const getSearchParams = (query: ParsedUrlQuery) =>
  ({ uid: parseParam(query[QueryParams.uid]), pageNumber: parseParam(query[QueryParams.pageNumber]), pageSize: parseParam(query[QueryParams.pageSize]) });