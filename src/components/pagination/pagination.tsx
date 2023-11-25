import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMySearchParams } from '../helpers/hooks';
import { SelectPageSize } from './selectPageSize';

type TPagination = {
  firstPage: boolean;
  lastPage: boolean;
  totalPages: number;
};

type TPageLink = {
  text: string;
  pageLink: number;
};

export default function Pagination({
  firstPage,
  lastPage,
  totalPages
}: TPagination): JSX.Element {
  const router = useRouter();
  const { search, pageSize, pageNumber } = useMySearchParams();

  return (
    <nav
      onClick={() => {
        router.push({
          pathname: search,
          query: {
            uid: '',
            pageSize,
            pageNumber,
          },
        });
      }}
      className="flex flex-row text-white p-2 items-center justify-center"
    >
      {+pageNumber >= 0 && <PageLink text="<-" pageLink={firstPage ? 0 : -1} />}
      <p className="p-2">{+pageNumber + 1}</p>
      {+pageNumber <= totalPages && <PageLink text="->" pageLink={lastPage ? 0 : 1} />}
      <SelectPageSize />
    </nav>
  );
}

function PageLink({ text, pageLink }: TPageLink): JSX.Element {
  const router = useRouter();
  const { uid, search, pageSize, pageNumber } = useMySearchParams();

  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        router.push({
          pathname: search,
          query: {
            uid,
            pageSize,
            pageNumber: +pageNumber + pageLink,
          },
        }, undefined, {shallow: true});
      }}
      className={'p-2 select-none'}
      disabled={!pageLink }
    >
      {text}
    </button>
  );
}
