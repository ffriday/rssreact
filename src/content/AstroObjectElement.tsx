import { TAstronomicalObject } from '../constants/types';

export default function AstroObjectElement({
  astronomicalObjectType,
  name,
  location,
}: TAstronomicalObject): JSX.Element {
  return (
    <li className="flex flex-col bg-gray-600 font-mon pl-2 text-white">
      <h3>Name: {name}</h3>
      <p>Object type: {astronomicalObjectType}</p>
      <p>Location: {location ? location.name : 'Unknown'}</p>
    </li>
  );
}
