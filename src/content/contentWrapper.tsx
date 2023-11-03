import { Await, useRouteError } from 'react-router-dom';
import { ReactNode, Suspense } from 'react';
import { MessageType } from '../constants/types';
import MessageBox from '../messageBox/messageBox';
import { getErrorMessage } from '../helpers/helpers';
import Pagination from '../pagination/pagination';

export default function ContentWrapper<T>({
  data,
  content,
}: {
  data: Promise<T>;
  content: ReactNode;
}): JSX.Element {
  const message = getErrorMessage(useRouteError());

  return (
    <>
      {message && <MessageBox message={message} type={MessageType.error} />}
      <Suspense fallback={<MessageBox message="Loading..." />}>
        <Await resolve={data}>
          <ul className="flex flex-col gap-1 mx-2">{content}</ul>
        </Await>
      </Suspense>
      <Pagination />
    </>
  );
}
