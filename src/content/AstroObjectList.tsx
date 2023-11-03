import { useAsyncValue } from 'react-router-dom';
import MessageBox from '../messageBox/messageBox';
import AstroObjectElement from './AstroObjectElement';
import { TSearchResponse } from '../constants/types';

export function ObjectList(): JSX.Element {
  const { astronomicalObjects, page } = useAsyncValue() as TSearchResponse;
  return (
    <>
      {!page.totalElements && <MessageBox message="NoResults" />}
      {astronomicalObjects.map((element) => (
        <AstroObjectElement key={element.uid} {...element} />
      ))}
    </>
  );
}
