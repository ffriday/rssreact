import { LoaderFunctionArgs, defer } from 'react-router-dom';
import { apiEnv } from '../constants/env';
import { LSKey, QueryParams } from '../constants/types';

export const loadLastSearch = (): string =>
  window.localStorage.getItem(LSKey.lastSearch) ?? '';

export const apiSearchRequest = async ({ params }: LoaderFunctionArgs) => {
  const number = params[QueryParams.pageNumber]
    ? `&pageNumber=${params[QueryParams.pageNumber]}`
    : '';
  const size = params[QueryParams.pageSize]
    ? `&pageSize=${params[QueryParams.pageSize]}`
    : '';
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
