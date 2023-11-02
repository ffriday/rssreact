import { useLoaderData, useAsyncValue, Await } from 'react-router-dom';
import { Suspense } from 'react';
import { TSearchResponse } from '../constants/types';
import AstroObject from './AstroObject';
import MessageBox from '../messageBox/messageBox';

export default function AstroObjectList(): JSX.Element {
  const { data } = useLoaderData() as { data: Promise<TSearchResponse> };
  // const error = useRouteError();

  return (
    <Suspense fallback={<MessageBox message="Loading..." />}>
      <Await resolve={data}>
        <ul className="flex flex-col gap-1 mx-2">
          <ObjectList />
        </ul>
      </Await>
    </Suspense>
  );
}

function ObjectList(): JSX.Element {
  const { astronomicalObjects, page } = useAsyncValue() as TSearchResponse;
  return (
    <>
      {!page.totalElements && <MessageBox message="NoResults" />}
      {astronomicalObjects.map((element) => (
        <AstroObject key={element.uid} {...element} />
      ))}
    </>
  );
}
