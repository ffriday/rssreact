import { TErrorInfo } from '../constants/types';
import { useState } from 'react';

export default function FakeError(): JSX.Element {
  const [isFakeError, setIsFakeError] = useState(false);

  const fakeError = () => {
    try {
      throw new Error(TErrorInfo.testError);
    } catch (error) {
      if (error instanceof Error) setIsFakeError(true);
    }
  };

  if (isFakeError) throw new Error(TErrorInfo.testError);

  return (
    <button
      onClick={fakeError}
      className="flex h-6 sm:h-7 content-center justify-center flex-wrap bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-3 mt-1"
    >
      Error
    </button>
  );
}
