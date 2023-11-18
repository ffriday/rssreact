import { useNavigate } from 'react-router-dom';
import { LSKey, QueryParams } from '../constants/types';
import { setPage, setPageSize, useAppDispatch, useAppSelector } from '../store';

export function SelectPageSize(): JSX.Element {
  const params = useAppSelector((state) => state.searchParams);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pageSizes = [5, 10, 20];

  const updatePageSize = (size: number): void => {
    dispatch(setPageSize(size));
    dispatch(setPage(0));
    window.localStorage.setItem(LSKey.pageSize, size.toString());
    navigate(`/0/${params.query}?${QueryParams.pageSize}=${size}`);
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
        defaultValue={params.pageSize}
        onChange={(event) => {
          event.stopPropagation();
          updatePageSize(Number(event.currentTarget.value));
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
