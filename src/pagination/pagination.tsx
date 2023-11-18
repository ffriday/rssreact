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

type TPageLink = {
  text: string;
  action: typeof prevPage | typeof nextPage;
  pageLink: 1 | 0 | -1;
};

export default function Pagination(): JSX.Element {
  const { pageSize, pageNumber, firstPage, lastPage } = useAppSelector(
    (state) => state.searchParams
  );
  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();

  return (
    <nav
      onClick={() => {
        dispatch(setUid(''));
        setSearchParams({ uid: '', pageSize: pageSize.toString() });
      }}
      className="flex flex-row text-white p-2 items-center justify-center"
    >
      <PageLink text="<-" action={prevPage} pageLink={firstPage ? 0 : -1} />
      <p className="p-2">{pageNumber + 1}</p>
      <PageLink text="->" action={nextPage} pageLink={lastPage ? 0 : 1} />
      <SelectPageSize />
    </nav>
  );
}

function PageLink({ text, action, pageLink }: TPageLink): JSX.Element {
  const { pageNumber, query, pageSize, uid } = useAppSelector(
    (state) => state.searchParams
  );
  const dispatch = useAppDispatch();
  const urlParams = `?${QueryParams.pageSize}=${pageSize}&${QueryParams.uid}=${uid}`;

  return (
    <Link
      onClick={(event) => {
        dispatch(action());
        event.stopPropagation();
      }}
      className={'p-2 select-none'}
      to={`/${pageNumber + pageLink}/${query}${urlParams}`}
    >
      {text}
    </Link>
  );
}
