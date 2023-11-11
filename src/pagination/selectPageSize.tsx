import { useContext } from 'react';
import { SearchContext } from '../layouts/RootLayout';
import { useNavigate } from 'react-router-dom';
import { LSKey, QueryParams } from '../constants/types';

export function SelectPageSize(): JSX.Element {
  const { state, updateState } = useContext(SearchContext);
  const navigate = useNavigate();
  const pageSizes = [5, 10, 20];

  const setContext = (size: number): void => {
    if (updateState) updateState({ itemsPerPage: size });
    window.localStorage.setItem(LSKey.pageSize, size.toString());
    navigate(`/0/?${QueryParams.pageSize}=${size}`);
  };

  return (
    <>
      <label className="ml-2" htmlFor="pageSize">
        Items:
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
          <option key={`pageSize${size}`} value={size}>
            {size}
          </option>
        ))}
      </select>
    </>
  );
}
