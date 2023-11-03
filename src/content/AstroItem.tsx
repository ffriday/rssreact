import { useAsyncValue, useNavigation } from 'react-router-dom';
import { TAstronomicalObject, WrappedAstroObject } from '../constants/types';
import MessageBox from '../messageBox/messageBox';

export default function AstroItem(): JSX.Element {
  const astronomicalObject = useAsyncValue() as WrappedAstroObject;
  const { state } = useNavigation();
  if (!astronomicalObject) return <></>;
  const {
    astronomicalObject: {
      uid,
      name,
      astronomicalObjectType,
      astronomicalObjects,
      location,
    },
  } = astronomicalObject;

  return (
    <section className="flex flex-col w-full mx-2">
      {state === 'loading' ? (
        <MessageBox message="Loading..." />
      ) : (
        <>
          <AstroItemView
            astronomicalObjectType={astronomicalObjectType}
            name={name}
            uid={uid}
            location={location}
          />
          <AstroNeighbours obj={astronomicalObjects} />
        </>
      )}
    </section>
  );
}

function AstroItemView({
  name,
  astronomicalObjectType,
  location,
}: TAstronomicalObject): JSX.Element {
  return (
    <div className="flex flex-col gap-1 bg-gray-600 font-mon text-white pl-2">
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
