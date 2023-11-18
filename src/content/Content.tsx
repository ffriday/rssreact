import { AstroObjectList, AstroItem } from './';
import { setPage, setPageSize, setUid, useAppDispatch } from '../store';
import { useParams, useSearchParams } from 'react-router-dom';
import { QueryParams } from '../constants/types';
import { useEffect } from 'react';

export default function Content(): JSX.Element {
  const [searchParams] = useSearchParams();
  const { pageNumber } = useParams();
  const dispatch = useAppDispatch();
  const uid = searchParams.get(QueryParams.uid);
  const size = searchParams.get(QueryParams.pageSize);

  useEffect(() => {
    if (uid) dispatch(setUid(uid));
    if (size) dispatch(setPageSize(Number(size)));
    if (pageNumber) dispatch(setPage(Number(pageNumber)));
  }, [dispatch, pageNumber, size, uid]);

  return (
    <>
      <AstroObjectList />
      {uid && <AstroItem />}
    </>
  );
}
