import { useEffect } from 'react';
import {
  useAddSearchMutation,
  useAppDispatch,
  useAppSelector,
} from '../store';
import { QueryParams } from '../constants/types';
import { useSearchParams } from 'next/navigation';
import { parseParam, getSearchParams } from './helpers';

// export const useDataLoad = () => {
//   const [loadList, { data }] = useAddSearchMutation();
//   const { query, pageNumber, pageSize } = useAppSelector(
//     (state) => state.searchParams
//   );
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     (async () => {
//       await loadList({
//         query: query,
//         page: pageNumber.toString(),
//         size: pageSize.toString(),
//       }).unwrap();
//     })();
//   }, [loadList, pageNumber, pageSize, query]);

//   useEffect(() => {
//     dispatch(
//       setPageParams({
//         first: data?.page.firstPage ?? true,
//         last: data?.page.lastPage ?? false,
//       })
//     );
//   }, [data?.page.firstPage, data?.page.lastPage, dispatch]);

//   return data;
// };

export const useMySearchParams = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get(QueryParams.searcInputName) || '';
  const uid = searchParams.get(QueryParams.uid) || '';
  const pageSize = searchParams.get(QueryParams.pageSize) || '';
  const pageNumber = searchParams.get(QueryParams.pageNumber) || '';
  return { search, uid, pageNumber, pageSize };
};
