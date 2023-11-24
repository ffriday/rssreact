import MessageBox from '../messageBox/messageBox';
import AstroObjectElement from './AstroObjectElement';
import { TErrorInfo } from '../constants/types';
import Pagination from '../pagination/pagination';
import { setUid, useAppDispatch, useAppSelector } from '../store';
import { useDataLoad } from '../helpers/hooks';

export default function AstroObjectList(): JSX.Element {
  const { pageSize, uid: currentUid } = useAppSelector(
    (state) => state.searchParams
  );
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const data = useDataLoad();

  const selectUid = (uid: string) => {
    if (uid) {
      dispatch(setUid(uid));
      setSearchParams({ uid, pageSize: pageSize.toString() });
    }
  };

  return (
    <section className="flex flex-col w-full mx-2">
      {!data ? (
        <MessageBox message={TErrorInfo.loading} />
      ) : (
        <>
          {!data.page.totalElements && (
            <MessageBox message={TErrorInfo.empty} />
          )}
          <ul className="flex flex-col gap-1">
            {data.astronomicalObjects.map((element) => (
              <AstroObjectElement
                key={element.uid}
                {...element}
                selectUid={selectUid}
                isSelected={element.uid === currentUid}
              />
            ))}
          </ul>
          <Pagination />
        </>
      )}
    </section>
  );
}
