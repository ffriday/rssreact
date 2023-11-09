import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Search from '../search/Search';
import { initialSearchContextState, loadLastSearch } from '../helpers/helpers';
import {
  TAppState,
  TAstronomicalObject,
  TErrorInfo,
  TSearchContext,
} from '../constants/types';

export const SearchContext = createContext<TAppState>({
  state: initialSearchContextState(),
  updateState: (newState: Partial<TSearchContext>) => {
    newState;
  },
  addObjectList: (objectList: TAstronomicalObject[]) => {
    objectList;
  },
  objectList: [],
});

export default function RootLayout(): JSX.Element {
  const [isFakeError, setIsFakeError] = useState(false);
  const [appState, setAppState] = useState<TSearchContext>(
    initialSearchContextState
  );
  const [objectList, setObjectList] = useState<TAstronomicalObject[]>([]);

  const updateAppState = (newState: Partial<TSearchContext>): void =>
    setAppState({ ...appState, ...newState });

  const addObjectList = (objectList: TAstronomicalObject[]): void =>
    setObjectList(objectList);

  const fakeError = () => {
    try {
      {
        throw new Error(TErrorInfo.testError);
      }
    } catch (error) {
      if (error instanceof Error) setIsFakeError(true);
    }
  };

  if (isFakeError) throw new Error(TErrorInfo.testError);

  return (
    <SearchContext.Provider
      value={{
        state: appState,
        objectList: objectList,
        updateState: updateAppState,
        addObjectList,
      }}
    >
      <div className="flex flex-col justify-top h-full bg-gray-700 font-mono">
        <header className="flex flex-row flex-wrap">
          <h1 className="text-xl sm:text-2xl w-screen sm:w-max sm:pr-10 font-bold text-red-400 text-left ml-2">
            RSS Astro Objects
          </h1>
          <nav className="h-15 sm:h-10 flex flex-row flex-wrap content-center justify-start pb-2">
            <Search defaultValue={loadLastSearch()} />
            <button
              onClick={fakeError}
              className="flex h-6 sm:h-7 content-center justify-center flex-wrap bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-3 mt-1"
            >
              Error
            </button>
          </nav>
        </header>
        <main className="bg-gray-700 flex flex-row w-full">
          <Outlet />
        </main>
      </div>
    </SearchContext.Provider>
  );
}
