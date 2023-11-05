import { Link, useParams, useSearchParams } from 'react-router-dom';
import { QueryParams, TSearchPage } from '../constants/types';

export default function Pagination({
  firstPage,
  lastPage,
  pageNumber,
}: TSearchPage): JSX.Element {
  const { query } = useParams();
  const [searchParams] = useSearchParams();
  const uid = searchParams.get(QueryParams.uid);
  const params = uid ? `?${QueryParams.uid}=${uid}` : '';
  const back = firstPage ? pageNumber : pageNumber - 1;
  const forward = lastPage ? pageNumber : pageNumber + 1;

  return (
    <nav className="flex flex-row text-white p-2 items-center justify-center">
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
    </nav>
  );
}
