import { useState, useEffect } from 'react';
import Search from './search/Search';
import AstroObjectList from './content/AstroObjectList';
import { TAstromicalObject, TColor, TErrorInfo } from './constants/types';
import { apiSearchRequest, loadLastSearch } from './helpers/helpers';
import ErrorBox from './errorBox/error';

type TBodyResponse = {
  astronomicalObjects: TAstromicalObject[];
};

export default function App(): JSX.Element {
  const lastSearch = loadLastSearch();

  const [AstromicalObject, setAstromicalObject] = useState<TAstromicalObject[]>(
    []
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => await search(lastSearch))();
  }, [lastSearch]);

  const search = async (value: string) => {
    console.log('search');
    setError('');
    setLoading(true);
    try {
      const res = await apiSearchRequest(value, 50);
      if (res.ok) {
        const { astronomicalObjects }: TBodyResponse = await res.json();
        setAstromicalObject(astronomicalObjects);
        if (!astronomicalObjects.length) setError(TErrorInfo.empty);
      }
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
    setLoading(false);
  };

  const fakeError = () => {
    try {
      {
        throw new Error('Test error');
      }
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  };

  if (error && error !== TErrorInfo.empty) throw new Error('Test error');

  return (
    <main className="flex flex-col justify-top h-full bg-gray-700 font-mono">
      <nav className="h-15 sm:h-10 flex flex-row flex-wrap content-center justify-start pb-2">
        <h1 className="text-xl sm:text-2xl w-screen sm:w-max sm:pr-10 font-bold text-red-400 text-left">
          RSS Astro Objects
        </h1>
        <Search searchHandler={search} defaultValue={lastSearch} />
        <button
          onClick={fakeError}
          className="flex h-6 sm:h-7 content-center justify-center flex-wrap bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-5 mt-1"
        >
          Error
        </button>
      </nav>
      <section className="h-auto bg-gray-700">
        {loading && <ErrorBox error="Loading..." color={TColor.lime} />}
        {error ? (
          <ErrorBox error={error} color={TColor.red} />
        ) : (
          <AstroObjectList AstromicalObject={AstromicalObject} />
        )}
      </section>
    </main>
  );
}
