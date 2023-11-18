import { AstroObjectList, AstroItem } from './';
import { setPage, setPageSize, setUid, useAppDispatch } from '../store';
import { useEffect } from 'react';
import { useAppURLParams } from '../helpers/hooks';

export default function Content(): JSX.Element {
  const dispatch = useAppDispatch();
  const { pageNumber, size, uid } = useAppURLParams();

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
