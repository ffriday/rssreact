import AstroObject from './AstroObject';
import { TAstroObjectList } from '../constants/types';

export default function AstroObjectList({
  AstromicalObject,
}: TAstroObjectList): JSX.Element {
  return (
    <ul className="flex flex-col gap-1 px-2">
      {AstromicalObject.map((element) => (
        <AstroObject key={element.uid} {...element} />
      ))}
    </ul>
  );
}
