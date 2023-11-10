import { Await, useRouteError } from 'react-router-dom';
import { ReactNode, Suspense } from 'react';
import { MessageType, TErrorInfo } from '../constants/types';
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
      <Suspense
        fallback={
          <section className="flex flex-col w-full mx-2">
            <MessageBox message={TErrorInfo.loading} />
          </section>
        }
      >
        <Await resolve={data}>{content}</Await>
      </Suspense>
    </>
  );
}
