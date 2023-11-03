import { useAsyncValue } from 'react-router-dom';
import MessageBox from '../messageBox/messageBox';
import AstroObjectElement from './AstroObjectElement';
import { TSearchResponse } from '../constants/types';
import { useState } from 'react';

export function AstroObjectList(): JSX.Element {
  const { astronomicalObjects, page } = useAsyncValue() as TSearchResponse;
  const [selectedUid, setSelectedUid] = useState('');
  const selectUid = (uid: string) => setSelectedUid(uid);
  return (
    <>
      {!page.totalElements && <MessageBox message="NoResults" />}
      {astronomicalObjects.map((element) => (
        <AstroObjectElement
          key={element.uid}
          {...element}
          selectUid={selectUid}
          isSelected={element.uid === selectedUid}
        />
      ))}
    </>
  );
}
