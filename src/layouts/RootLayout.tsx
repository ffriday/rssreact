import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Search from '../search/Search';
import { loadLastSearch } from '../helpers/helpers';

export default function RootLayout(): JSX.Element {
  const [isFakeError, setIsFakeError] = useState(false);

  const fakeError = () => {
    try {
      {
        throw new Error('Test error');
      }
    } catch (error) {
      if (error instanceof Error) setIsFakeError(true);
    }
  };

  if (isFakeError) throw new Error('Test error');

  return (
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
      <main className="bg-gray-700">
        <Outlet />
      </main>
    </div>
  );
}
