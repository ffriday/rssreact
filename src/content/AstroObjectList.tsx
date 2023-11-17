import { useSearchParams } from 'react-router-dom';
import MessageBox from '../messageBox/messageBox';
import { AstroObjectElement } from './';
import { TErrorInfo } from '../constants/types';
import { useEffect, useState } from 'react';
import Pagination from '../pagination/pagination';
import { useAddSearchMutation, useAppSelector } from '../store';

export default function AstroObjectList(): JSX.Element {
  const [loadList, { data }] = useAddSearchMutation();
  const params = useAppSelector((state) => state.searchParams);
  const [selectedUid, setSelectedUid] = useState('');
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      await loadList({
        query: params.uid,
        page: params.pageNumber.toString(),
        size: params.pageSize.toString(),
      }).unwrap();
    })();
  }, [loadList, params.pageNumber, params.pageSize, params.uid]);

  const selectUid = (uid: string) => {
    if (uid) {
      setSelectedUid(uid);
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
                isSelected={element.uid === selectedUid}
              />
            ))}
          </ul>
          <Pagination {...data.page} />
        </>
      )}
    </section>
  );
}
