/* eslint-disable @typescript-eslint/no-unused-vars */
import { Await } from 'react-router-dom';
import { ReactNode, Suspense } from 'react';
import { TErrorInfo } from '../constants/types';
import MessageBox from '../messageBox/messageBox';
import Content from './Content';

export default function ContentWrapper<T>({}: {
  data: Promise<T>;
  content: ReactNode;
}): JSX.Element {
  return (
    <>
      {/* <Suspense
        fallback={
          <section className="flex flex-col w-full mx-2">
            <MessageBox message={TErrorInfo.loading} />
          </section>
        }
      >
        <Await resolve={data}>{content}</Await>
      </Suspense> */}
      <Content />
    </>
  );
}
