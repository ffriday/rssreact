import { Link, useParams, useSearchParams } from 'react-router-dom';
import { QueryParams, TSearchPage } from '../constants/types';
import { useContext } from 'react';
import { SearchContext } from '../layouts/RootLayout';
import { SelectPageSize } from './selectPageSize';

export default function Pagination({
  firstPage,
  lastPage,
  pageNumber,
}: TSearchPage): JSX.Element {
  const { query } = useParams();
  const [searchParams] = useSearchParams();
  const { state } = useContext(SearchContext);
  const uid = searchParams.get(QueryParams.uid);
  const [, setSearchParams] = useSearchParams();

  const params = uid
    ? `?${QueryParams.pageSize}=${state.itemsPerPage}&${QueryParams.uid}=${uid}`
    : `?${QueryParams.pageSize}=${state.itemsPerPage}`;
  const back = firstPage ? pageNumber : pageNumber - 1;
  const forward = lastPage ? pageNumber : pageNumber + 1;

  return (
    <nav
      onClick={() =>
        setSearchParams({ uid: '', pageSize: state.itemsPerPage.toString() })
      }
      className="flex flex-row text-white p-2 items-center justify-center"
    >
      <Link
        onClick={(event) => event.stopPropagation()}
        className={`p-2 select-none ${firstPage ? 'pointer-events-none' : ''}`}
        to={`/${back}/${query ?? ''}${params}`}
      >
        {'<-'}
      </Link>
      <p className="p-2">{pageNumber + 1}</p>
      <Link
        onClick={(event) => event.stopPropagation()}
        className={`p-2 select-none ${lastPage ? 'pointer-events-none' : ''}`}
        to={`/${forward}/${query ?? ''}${params}`}
      >
        {'->'}
      </Link>
      <SelectPageSize />
    </nav>
  );
}
