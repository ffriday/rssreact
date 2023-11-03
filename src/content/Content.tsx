import { useLoaderData } from 'react-router-dom';
import { TSearchResponse, TSingleAstronomicalObject } from '../constants/types';
import ContentWrapper from './contentWrapper';
import { AstroObjectList } from './AstroObjectList';

export default function Content(): JSX.Element {
  const { list, item } = useLoaderData() as {
    list: Promise<TSearchResponse>;
    item: Promise<TSingleAstronomicalObject>;
  };
  console.log(item);

  return (
    <>
      <ContentWrapper data={list} content={<AstroObjectList />} />
    </>
  );
}
