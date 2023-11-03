import {
  useLoaderData,
  useAsyncValue,
  Await,
  useRouteError,
} from 'react-router-dom';
import { Suspense } from 'react';
import { MessageType, TSearchResponse } from '../constants/types';
import MessageBox from '../messageBox/messageBox';
import { getErrorMessage } from '../helpers/helpers';
import AstroObjectElement from './AstroObjectElement';
import Pagination from '../pagination/pagination';

export default function AstroObjectList(): JSX.Element {
  const { data } = useLoaderData() as { data: Promise<TSearchResponse> };
  const message = getErrorMessage(useRouteError());

  return (
    <>
      {message && <MessageBox message={message} type={MessageType.error} />}
      <Suspense fallback={<MessageBox message="Loading..." />}>
        <Await resolve={data}>
          <ul className="flex flex-col gap-1 mx-2">
            <ObjectList />
          </ul>
        </Await>
      </Suspense>
      <Pagination />
    </>
  );
}

function ObjectList(): JSX.Element {
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
