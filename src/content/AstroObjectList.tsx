import { useAsyncValue, useSearchParams } from 'react-router-dom';
import MessageBox from '../messageBox/messageBox';
import AstroObjectElement from './AstroObjectElement';
import { TSearchResponse } from '../constants/types';
import { useState } from 'react';
import Pagination from '../pagination/pagination';

export default function AstroObjectList(): JSX.Element {
  const { astronomicalObjects, page } = useAsyncValue() as TSearchResponse;
  const [selectedUid, setSelectedUid] = useState('');
  const [, setSearchParams] = useSearchParams();

  const selectUid = (uid: string) => {
    if (uid) {
      setSelectedUid(uid);
      setSearchParams({ uid });
    }
  };

  return (
    <section className="flex flex-col flex-grow w-1/2">
      {!page.totalElements && <MessageBox message="NoResults" />}
      <ul className="flex flex-col gap-1 mx-2">
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
