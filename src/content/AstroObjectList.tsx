import { useAsyncValue, useSearchParams } from 'react-router-dom';
import MessageBox from '../messageBox/messageBox';
import AstroObjectElement from './AstroObjectElement';
import { TSearchResponse } from '../constants/types';
import { useState } from 'react';
import Pagination from '../pagination/pagination';

export default function AstroObjectList(): JSX.Element {
  const { astronomicalObjects, page } = useAsyncValue() as TSearchResponse;
  const [selectedUid, setSelectedUid] = useState('');
  // const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const selectUid = (uid: string) => {
    if (uid) {
      setSelectedUid(uid);
      // navigate(`../${uid}`, { relative: "path" });
      setSearchParams({ uid });
    }
  };

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
      <Pagination {...page} />
    </>
  );
}
