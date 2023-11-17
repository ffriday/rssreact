import { AstroObjectList, AstroItem } from './';
import { useAppSelector } from '../store';

export default function Content(): JSX.Element {
  const uid = useAppSelector((state) => state.searchParams.uid);

  return (
    <>
      <AstroObjectList />
      {uid && <AstroItem />}
    </>
  );
}
