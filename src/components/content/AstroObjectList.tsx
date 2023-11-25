import MessageBox from '../messageBox/messageBox';
import AstroObjectElement from './AstroObjectElement';
import { TErrorInfo } from '../constants/types';
import Pagination from '../pagination/pagination';
import { useDataLoad, useMySearchParams } from '../helpers/hooks';
import { useRouter } from 'next/router';

export default function AstroObjectList(): JSX.Element {
  const router = useRouter();
  const { uid: currentUid, pageSize, pageNumber, search } = useMySearchParams();
  const data = useDataLoad();

  const selectUid = (uid: string) => {
    if (uid) {
      router.push({
        pathname: search,
        query: {
          uid,
          pageSize,
          pageNumber,
        },
      });
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
          {/* <Pagination /> */}
        </>
      )}
    </section>
  );
}
