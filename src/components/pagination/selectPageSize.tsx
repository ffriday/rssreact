import { useRouter } from 'next/router';
import { useMySearchParams } from '../helpers/hooks';

export function SelectPageSize(): JSX.Element {
  const router = useRouter();
  const { search, pageSize } = useMySearchParams();
  const pageSizes = [5, 10, 20];

  const updatePageSize = (size: number): void => {
    router.push({
      pathname: search,
      query: {
        uid: '',
        pageSize: size,
        pageNumber: 0,
      },
    });
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
        defaultValue={pageSize}
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
