import { FormEvent } from 'react';
import { QueryParams } from '../constants/types';
import { useRouter } from 'next/router';
import { useMySearchParams } from '../helpers/hooks';

type TSearchProps = {
  searchQuery: string;
};

export default function Search({
  searchQuery,
}: TSearchProps): JSX.Element {
  const router = useRouter();
  const { uid, pageSize } = useMySearchParams();

  const search = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const url = new FormData(event.currentTarget).get(QueryParams.searcInputName);
    router.push({
      pathname: url ? url.toString() : '/',
      query: {
        uid,
        pageSize,
        pageNumber: 0,
      },
    });
  };

  return (
    <form className="flex" onSubmit={(event) => search(event)}>
      <input
        defaultValue={searchQuery}
        placeholder="Type something"
        className="flex h-6 sm:h-7 ml-2 sm:ml-0 content-center justify-center flex-wrap rounded mt-1"
        type={QueryParams.searcInputName}
        name={QueryParams.searcInputName}
      ></input>
      <button className="flex h-6 sm:h-7 content-center justify-center flex-wrap bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3 mt-1">
        Search
      </button>
    </form>
  );
}
