import { useState, useEffect } from 'react';
import Search from '../search/Search';
import AstroObjectList from '../content/AstroObjectList';
import { TAstromicalObject, TColor, TErrorInfo } from '../constants/types';
import { apiSearchRequest, loadLastSearch } from '../helpers/helpers';
import ErrorBox from '../messageBox/messageBox';
import { useHandleLoad } from '../hooks/useHandleLoad';

type TBodyResponse = {
  astronomicalObjects: TAstromicalObject[];
};

export default function App(): JSX.Element {
  const lastSearch = loadLastSearch();

  const [AstromicalObject, setAstromicalObject] = useState<TAstromicalObject[]>(
    []
  );
  const [handleLoad, setHandleLoad] = useHandleLoad();

  useEffect(() => {
    (async () => await search(lastSearch))();
  }, [lastSearch]);

  const search = async (value: string) => {
    setHandleLoad(true, '');
    try {
      const res = await apiSearchRequest(value, 50);
      if (res.ok) {
        const { astronomicalObjects }: TBodyResponse = await res.json();
        setAstromicalObject(astronomicalObjects);
        if (!astronomicalObjects.length) {
          setHandleLoad(false, TErrorInfo.empty);
        } else {
          setHandleLoad(false);
        }
      }
    } catch (error) {
      if (error instanceof Error) setHandleLoad(false, error.message);
    }
  };

  const fakeError = () => {
    try {
      {
        throw new Error('Test error');
      }
    } catch (error) {
      if (error instanceof Error) setHandleLoad(false, error.message);
    }
  };

  if (handleLoad.hasError && handleLoad.hasError !== TErrorInfo.empty)
    throw new Error('Test error');

  return (
    <main className="flex flex-col justify-top h-full bg-gray-700 font-mono">
      <nav className="h-15 sm:h-10 flex flex-row flex-wrap content-center justify-start pb-2">
        <h1 className="text-xl sm:text-2xl w-screen sm:w-max sm:pr-10 font-bold text-red-400 text-left ml-2">
          RSS Astro Objects
        </h1>
        <Search searchHandler={search} defaultValue={lastSearch} />
        <button
          onClick={fakeError}
          className="flex h-6 sm:h-7 content-center justify-center flex-wrap bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-3 mt-1"
        >
          Error
        </button>
      </nav>
      <section className="h-auto bg-gray-700">
        {handleLoad.isLoading && (
          <ErrorBox error="Loading..." color={TColor.lime} />
        )}
        {handleLoad.hasError ? (
          <ErrorBox error={handleLoad.hasError} color={TColor.red} />
        ) : (
          <AstroObjectList AstromicalObject={AstromicalObject} />
        )}
      </section>
    </main>
  );
}
