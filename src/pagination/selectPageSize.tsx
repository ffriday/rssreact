/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from 'react';
import { SearchContext } from '../layouts/RootLayout';
import { useSearchParams } from 'react-router-dom';

export function SelectPageSize(): JSX.Element {
  const { state, updateState } = useContext(SearchContext);
  const [, setSearchParams] = useSearchParams();
  const [selectSize] = useState(state.itemsPerPage.toString());
  const pageSizes = [5, 10, 20];

  const setContext = (size: number): void => {
    updateState({ itemsPerPage: Number(size) });
    setSearchParams({ pageSize: size.toString() });
  };

  return (
    <>
      <label className="ml-2" htmlFor="pageSize">
        Items:{' '}
      </label>
      <select
        className="text-black ml-1"
        name="pageSize"
        id="pageSize"
        defaultValue={state.itemsPerPage}
        onChange={(event) => {
          event.stopPropagation();
          setContext(Number(event.currentTarget.value));
        }}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {pageSizes.map((size) => (
          <option
            key={`pageSize${size}`}
            value={size}
            // selected={size === context.itemsPerPage}
          >
            {size}
          </option>
        ))}
      </select>
    </>
  );
}
