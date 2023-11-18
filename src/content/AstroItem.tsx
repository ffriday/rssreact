import { useSearchParams } from 'react-router-dom';
import { TAstronomicalObject } from '../constants/types';
import MessageBox from '../messageBox/messageBox';
import {
  setUid,
  useAppDispatch,
  useAppSelector,
  useGetItemQuery,
} from '../store';

export default function AstroItem(): JSX.Element {
  const { uid } = useAppSelector((state) => state.searchParams);
  const { data, isFetching } = useGetItemQuery({ uid: uid });

  let content = <></>;
  if (isFetching) {
    content = isFetching ? <MessageBox message="Loading..." /> : <></>;
  } else if (!data) {
    content = <MessageBox message="Error" />;
  } else {
    const {
      astronomicalObject: {
        astronomicalObjectType,
        astronomicalObjects,
        name,
        uid,
        location,
      },
    } = data;
    content = (
      <>
        <AstroItemView
          astronomicalObjectType={astronomicalObjectType}
          name={name}
          uid={uid}
          location={location}
        />
        <AstroNeighbours obj={astronomicalObjects} />
        <CloseItemView />
      </>
    );
  }

  return <section className="flex flex-col w-full mx-2">{content}</section>;
}

function AstroItemView({
  name,
  astronomicalObjectType,
  location,
}: TAstronomicalObject): JSX.Element {
  return (
    <div
      data-testid="card-element"
      className="flex flex-col gap-1 bg-gray-600 font-mon text-white pl-2"
    >
      <h3>Name: {name}</h3>
      <p>Object type: {astronomicalObjectType}</p>
      <p>Location: {location ? location.name : 'Unknown'}</p>
    </div>
  );
}

function AstroNeighbours({ obj }: { obj: TAstronomicalObject[] }): JSX.Element {
  return (
    <>
      <h3 className="my-1 pl-2 bg-gray-600 font-mon text-white">
        Objets from the same location:
      </h3>
      <div className="flex flex-row flex-wrap">
        {obj.map(({ name, uid }) => (
          <p
            key={uid}
            className="flex flex-col mr-1 mb-1 bg-gray-600 font-mon text-white px-2"
          >
            {name}
          </p>
        ))}
      </div>
    </>
  );
}

function CloseItemView(): JSX.Element {
  const [, setSearchParams] = useSearchParams();
  const { pageSize } = useAppSelector((state) => state.searchParams);
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => {
        dispatch(setUid(''));
        setSearchParams({ uid: '', pageSize: pageSize.toString() });
      }}
      className="flex h-6 sm:h-7 content-center justify-center flex-wrap bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-1"
    >
      Close
    </button>
  );
}
