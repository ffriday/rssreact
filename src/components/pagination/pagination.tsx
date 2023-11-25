import { SelectPageSize } from './selectPageSize';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMySearchParams } from '../helpers/hooks';

type TPagination = {
  firstPage: boolean;
  lastPage: boolean;
};

type TPageLink = {
  text: string;
  pageLink: string;
};

export default function Pagination({
  firstPage,
  lastPage,
}: TPagination): JSX.Element {
  const router = useRouter();
  const { search, pageSize, pageNumber } = useMySearchParams();

  return (
    <nav
      onClick={() => {
        // dispatch(setUid(''));
        // setSearchParams({ uid: '', pageSize: pageSize.toString() });
      }}
      className="flex flex-row text-white p-2 items-center justify-center"
    >
      <PageLink text="<-" pageLink={firstPage ? 0 : -1} />
      <p className="p-2">{+pageNumber + 1}</p>
      <PageLink text="->" pageLink={lastPage ? 0 : 1} />
      {/* <SelectPageSize /> */}
    </nav>
  );
}

function PageLink({ text, pageLink }: TPageLink): JSX.Element {
  return (
    <Link
      onClick={(event) => {
        event.stopPropagation();
      }}
      className={'p-2 select-none'}
      href={pageLink}
    >
      {text}
    </Link>
  );
}
