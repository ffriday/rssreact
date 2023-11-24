import { TAstronomicalObject, WrappedAstroObject } from '../constants/types';
import MessageBox from '../messageBox/messageBox';
import { useGetItemQuery } from '../store';
import { useMySearchParams } from '../helpers/hooks';
import { useRouter } from 'next/router';
import { parseParam } from '../helpers/helpers';

type TAstroItem = {
  uid: string;
};

export default function AstroItem({ uid }: TAstroItem): JSX.Element {
  const { data } = useGetItemQuery({ uid: uid });

  if (data === undefined || !data.astronomicalObject) return <MessageBox message="Error" />;

  return (
    <section className="flex flex-col w-full mx-2">
      <AstroItemView
        astronomicalObjectType={data.astronomicalObject.astronomicalObjectType}
        name={data.astronomicalObject.name}
        uid={data.astronomicalObject.uid}
        location={data.astronomicalObject.location}
      />
      <AstroNeighbours obj={data.astronomicalObject.astronomicalObjects} />
      <CloseItemView />
    </section>
  );
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
  const router = useRouter();
  const { pageSize, pageNumber } = router.query;

  const close = () =>
    router.push({
      pathname: parseParam(router.query.search),
      query: {
        uid: '',
        pageSize,
        pageNumber,
      },
    });

  return (
    <button
      onClick={close}
      className="flex h-6 sm:h-7 content-center justify-center flex-wrap bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-1"
    >
      Close
    </button>
  );
}
