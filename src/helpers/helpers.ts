import { apiEnv } from '../constants/env';
import { LSKey } from '../constants/types';

export const loadLastSearch = (): string =>
  window.localStorage.getItem(LSKey.lastSearch) ?? '';

export const apiSearchRequest = async (name: string, pageSize: number) => {
  return await fetch(
    `${apiEnv.url}${apiEnv.endpoint}?name=${name}&pageSize=${pageSize}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
};
