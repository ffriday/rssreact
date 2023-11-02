import { useState } from 'react';
import { LSKey } from '../constants/types';

type TSearch = {
  defaultValue: string;
  searchHandler: (value: string) => void;
};

export default function Search({
  defaultValue,
  searchHandler,
}: TSearch): JSX.Element {
  const [currentSearch, setCurrentSearch] = useState(defaultValue);

  const search = (): void => {
    window.localStorage.setItem(LSKey.lastSearch, currentSearch);
    searchHandler(currentSearch);
  };

  return (
    <>
      <input
        onKeyUp={(e) => {
          if (e.key === 'Enter') search();
        }}
        value={currentSearch}
        onChange={(e) => setCurrentSearch(e.target.value.trim())}
        placeholder="Type something"
        className="flex h-6 sm:h-7 ml-2 sm:ml-0 content-center justify-center flex-wrap rounded mt-1"
        type="search"
      ></input>
      <button
        onClick={search}
        className="flex h-6 sm:h-7 content-center justify-center flex-wrap bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3 mt-1"
      >
        Search
      </button>
    </>
  );
}
