import { TAstronomicalObject } from '../constants/types';

type TAstroObjectElement = TAstronomicalObject & {
  selectUid: (uid: string) => void;
  isSelected?: boolean;
};

export default function AstroObjectElement({
  astronomicalObjectType,
  name,
  location,
  selectUid,
  uid,
  isSelected,
}: TAstroObjectElement): JSX.Element {
  return (
    <li
      onClick={(event) => {
        event.stopPropagation();
        selectUid(uid);
      }}
      className={`flex flex-col bg-gray-600 font-mon pl-2 text-white hover:bg-gray-500 transition ease-out delay-100 ${
        isSelected && 'bg-red-500 hover:bg-red-400'
      }`}
    >
      <h3>Name: {name}</h3>
      <p>Object type: {astronomicalObjectType}</p>
      <p>Location: {location ? location.name : 'Unknown'}</p>
    </li>
  );
}
