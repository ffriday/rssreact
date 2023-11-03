import { useLoaderData } from 'react-router-dom';
// import AstroObjectList from './AstroObjectList';
import { TSearchResponse, TSingleAstronomicalObject } from '../constants/types';
import ContentWrapper from './contentWrapper';
import { ObjectList } from './AstroObjectList';

export default function Content(): JSX.Element {
  const { list, item } = useLoaderData() as {
    list: Promise<TSearchResponse>;
    item: Promise<TSingleAstronomicalObject>;
  };
  console.log(item);

  return (
    <>
      {/* <AstroObjectList list={list}/> */}
      <ContentWrapper data={list} content={<ObjectList />} />
    </>
  );
}
