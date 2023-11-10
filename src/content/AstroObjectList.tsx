import { useAsyncValue, useSearchParams } from 'react-router-dom';
import MessageBox from '../messageBox/messageBox';
import AstroObjectElement from './AstroObjectElement';
import { TErrorInfo, TSearchResponse } from '../constants/types';
import { useContext, useEffect, useState } from 'react';
import Pagination from '../pagination/pagination';
import { SearchContext } from '../layouts/RootLayout';

export default function AstroObjectList(): JSX.Element {
  const { astronomicalObjects, page } = useAsyncValue() as TSearchResponse;
  const { state, addObjectList } = useContext(SearchContext);
  const [selectedUid, setSelectedUid] = useState('');
  const [, setSearchParams] = useSearchParams();

  useEffect(
    () => addObjectList(astronomicalObjects),
    [astronomicalObjects, addObjectList]
  );

  const selectUid = (uid: string) => {
    if (uid) {
      setSelectedUid(uid);
      setSearchParams({ uid, pageSize: state.itemsPerPage.toString() });
    }
  };

  return (
    <section
      onClick={() => selectUid('')}
      className="flex flex-col w-full mx-2"
    >
      {!page.totalElements && <MessageBox message={TErrorInfo.empty} />}
      <ul className="flex flex-col gap-1">
        {astronomicalObjects.map((element) => (
          <AstroObjectElement
            key={element.uid}
            {...element}
            selectUid={selectUid}
            isSelected={element.uid === selectedUid}
          />
        ))}
      </ul>
      <Pagination {...page} />
    </section>
  );
}
