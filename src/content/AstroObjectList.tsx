import { useAsyncValue, useSearchParams } from 'react-router-dom';
import MessageBox from '../messageBox/messageBox';
import AstroObjectElement from './AstroObjectElement';
import { TSearchResponse } from '../constants/types';
import { useContext, useState } from 'react';
import Pagination from '../pagination/pagination';
import { SearchContext } from '../layouts/RootLayout';

export default function AstroObjectList(): JSX.Element {
  const { state } = useContext(SearchContext);
  const { astronomicalObjects, page } = useAsyncValue() as TSearchResponse;
  const [selectedUid, setSelectedUid] = useState('');
  const [, setSearchParams] = useSearchParams();

  const selectUid = (uid: string) => {
    if (uid) {
      setSelectedUid(uid);
      setSearchParams({ uid, pageSize: state.itemsPerPage.toString() });
    }
  };

  return (
    <section
      onClick={() => setSearchParams({ uid: '' })}
      className="flex flex-col w-full mx-2"
    >
      {!page.totalElements && <MessageBox message="NoResults" />}
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
