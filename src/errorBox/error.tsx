import { TColor, TError } from '../constants/types';

export default function ErrorBox({ error, color }: TError): JSX.Element {
  const messageColor = color ?? TColor.red;

  return (
    <div
      className={`flex bg-${messageColor}-500 font-mon pl-2 text-white content-center justify-center`}
    >
      {error}
    </div>
  );
}
