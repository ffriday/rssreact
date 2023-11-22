import { useEffect } from 'react';
import {
  setPageParams,
  useAddSearchMutation,
  useAppDispatch,
  useAppSelector,
} from '../store';
import { useParams, useSearchParams } from 'react-router-dom';
import { QueryParams } from '../constants/types';

export const useDataLoad = () => {
  const [loadList, { data }] = useAddSearchMutation();
  const { query, pageNumber, pageSize } = useAppSelector(
    (state) => state.searchParams
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await loadList({
        query: query,
        page: pageNumber.toString(),
        size: pageSize.toString(),
      }).unwrap();
    })();
  }, [loadList, pageNumber, pageSize, query]);

  useEffect(() => {
    dispatch(
      setPageParams({
        first: data?.page.firstPage ?? true,
        last: data?.page.lastPage ?? false,
      })
    );
  }, [data?.page.firstPage, data?.page.lastPage, dispatch]);

  return data;
};

export const useAppURLParams = () => {
  const [searchParams] = useSearchParams();
  const { pageNumber } = useParams();
  const uid = searchParams.get(QueryParams.uid);
  const size = searchParams.get(QueryParams.pageSize);
  return { pageNumber, uid, size };
};
