import { useLoaderData } from 'react-router-dom';
import { TSearchResponse, TSingleAstronomicalObject } from '../constants/types';
import ContentWrapper from './contentWrapper';
import AstroObjectList from './AstroObjectList';
import AstroItem from './AstroItem';

export default function Content(): JSX.Element {
  const { list, item } = useLoaderData() as {
    list: Promise<TSearchResponse>;
    item: Promise<TSingleAstronomicalObject>;
  };

  return (
    <>
      <ContentWrapper data={list} content={<AstroObjectList />} />
      <ContentWrapper data={item} content={<AstroItem />} />
    </>
  );
}
