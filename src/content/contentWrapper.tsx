import { Await, useRouteError } from 'react-router-dom';
import { ReactNode, Suspense } from 'react';
import { MessageType } from '../constants/types';
import MessageBox from '../messageBox/messageBox';
import { getErrorMessage } from '../helpers/helpers';

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
        <Await resolve={data}>{content}</Await>
      </Suspense>
    </>
  );
}
