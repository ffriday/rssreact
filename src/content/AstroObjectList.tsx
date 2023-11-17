import { useSearchParams } from 'react-router-dom';
import MessageBox from '../messageBox/messageBox';
import { AstroObjectElement } from './';
import { TErrorInfo } from '../constants/types';
import { useEffect } from 'react';
import Pagination from '../pagination/pagination';
import {
  setUid,
  useAddSearchMutation,
  useAppDispatch,
  useAppSelector,
} from '../store';

export default function AstroObjectList(): JSX.Element {
  const [loadList, { data }] = useAddSearchMutation();
  const params = useAppSelector((state) => state.searchParams);
  // const [selectedUid, setSelectedUid] = useState('');
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await loadList({
        query: params.query,
        page: params.pageNumber.toString(),
        size: params.pageSize.toString(),
      }).unwrap();
    })();
  }, [loadList, params.pageNumber, params.pageSize, params.query]);

  const selectUid = (uid: string) => {
    if (uid) {
      dispatch(setUid(uid));
      setSearchParams({ uid, pageSize: params.pageSize.toString() });
    }
  };

  return (
    <section className="flex flex-col w-full mx-2">
      {!data ? (
        <MessageBox message={TErrorInfo.loading} />
      ) : (
        <>
          {!data.page.totalElements && (
            <MessageBox message={TErrorInfo.empty} />
          )}
          <ul className="flex flex-col gap-1">
            {data.astronomicalObjects.map((element) => (
              <AstroObjectElement
                key={element.uid}
                {...element}
                selectUid={selectUid}
                isSelected={element.uid === params.uid}
              />
            ))}
          </ul>
          <Pagination {...data.page} />
        </>
      )}
    </section>
  );
}
