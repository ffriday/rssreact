import { Link, useSearchParams } from 'react-router-dom';
import { SelectPageSize } from './selectPageSize';
import {
  nextPage,
  prevPage,
  setUid,
  useAppDispatch,
  useAppSelector,
} from '../store';
import { QueryParams } from '../constants/types';

export default function Pagination(): JSX.Element {
  const params = useAppSelector((state) => state.searchParams);
  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();

  const urlParams = `?${QueryParams.pageSize}=${params.pageSize}&${QueryParams.uid}=${params.uid}`;
  // const back = firstPage ? pageNumber : pageNumber - 1;
  // const forward = lastPage ? pageNumber : pageNumber + 1;

  return (
    <nav
      onClick={() => {
        dispatch(setUid(''));
        setSearchParams({ uid: '', pageSize: params.pageSize.toString() });
      }}
      className="flex flex-row text-white p-2 items-center justify-center"
    >
      <Link
        onClick={(event) => {
          dispatch(prevPage());
          event.stopPropagation();
        }}
        className={'p-2 select-none'}
        to={`/${params.pageNumber}/${params.query}${urlParams}`}
      >
        {'<-'}
      </Link>
      <p className="p-2">{params.pageNumber + 1}</p>
      <Link
        onClick={(event) => {
          dispatch(nextPage());
          event.stopPropagation();
        }}
        className={'p-2 select-none'}
        to={`/${params.pageNumber}/${params.query}${urlParams}`}
      >
        {'->'}
      </Link>
      <SelectPageSize />
    </nav>
  );
}
