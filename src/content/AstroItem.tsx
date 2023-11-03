import { useAsyncValue } from 'react-router-dom';
import {
  TAstronomicalObject,
  TSingleAstronomicalObject,
} from '../constants/types';

type WrappedAstroObject = {
  astronomicalObject: TSingleAstronomicalObject;
};

export default function AstroItem(): JSX.Element {
  const {
    astronomicalObject: {
      uid,
      name,
      astronomicalObjectType,
      astronomicalObjects,
      location,
    },
  } = useAsyncValue() as WrappedAstroObject;
  console.log(astronomicalObjects);

  return uid ? (
    <section className="flex flex-col flex-grow w-1/2">
      <AstroItemView
        astronomicalObjectType={astronomicalObjectType}
        name={name}
        uid={uid}
        location={location}
      />
      {astronomicalObjects.length ? (
        <>
          <h3 className="mx-2 my-1 pl-2 bg-gray-600 font-mon text-white">
            Objets from the same location:
          </h3>
          <div className="flex flex-row flex-wrap mx-2">
            {astronomicalObjects.map((object) => (
              <AstroNeighbours key={object.uid} name={object.name} />
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  ) : (
    <></>
  );
}

function AstroItemView({
  name,
  astronomicalObjectType,
  location,
}: TAstronomicalObject): JSX.Element {
  return (
    <div className="flex flex-col gap-1 mx-2 bg-gray-600 font-mon text-white pl-2">
      <h3>Name: {name}</h3>
      <p>Object type: {astronomicalObjectType}</p>
      <p>Location: {location ? location.name : 'Unknown'}</p>
    </div>
  );
}

function AstroNeighbours({ name }: { name: string }): JSX.Element {
  return (
    <p className="flex flex-col gap-1 mr-1 mb-1 bg-gray-600 font-mon text-white px-2">
      {name}
    </p>
  );
}
