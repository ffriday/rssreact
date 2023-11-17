/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LSKey, QueryParams } from '../constants/types';
import { setQuery, setUid, useAppDispatch, useAppSelector } from '../store';

type TSearch = {
  defaultValue: string;
};

export default function Search({ defaultValue }: TSearch): JSX.Element {
  const params = useAppSelector((state) => state.searchParams);
  const dispatch = useAppDispatch();
  const [currentSearch, setCurrentSearch] = useState(defaultValue);
  const navigate = useNavigate();

  const search = (): void => {
    dispatch(setQuery(currentSearch.trim()));
    console.log(params.query);
    window.localStorage.setItem(LSKey.lastSearch, currentSearch.trim());
    navigate(
      `0/${currentSearch.trim()}?${QueryParams.pageSize}=${params.pageSize}`
    );
  };

  return (
    <>
      <input
        onKeyUp={(e) => {
          if (e.key === 'Enter') search();
        }}
        value={currentSearch}
        onChange={(e) => setCurrentSearch(e.target.value)}
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
