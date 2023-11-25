import { useGetSearchQuery } from '../store';
import { useRouter } from 'next/router';
import { parseParam } from './helpers';

export const useDataLoad = () => {
  const { search, pageNumber, pageSize } = useMySearchParams();
  const { data } = useGetSearchQuery({
    query: search,
    page: pageNumber,
    size: pageSize,
  });
  return data;
};

export const useMySearchParams = () => {
  const router = useRouter();
  const search = parseParam(router.query.search);
  const uid = parseParam(router.query.uid);
  const pageSize = parseParam(router.query.pageSize);
  const pageNumber = parseParam(router.query.pageNumber);
  return { search, uid, pageSize, pageNumber };
};
