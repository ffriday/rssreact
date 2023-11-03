import { TErrorInfo } from '../constants/types';

export default function ErrorMessage(): JSX.Element {
  return (
    <div className="flex justify-center flex-col gap-4 content-center h-full bg-gray-700 font-mono text-xl">
      <h1 className="text-center">{TErrorInfo.sorry}</h1>
      <a href="/" className="text-center text-red-950">
        Back to main page
      </a>
    </div>
  );
}
