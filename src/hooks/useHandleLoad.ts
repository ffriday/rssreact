import { useState } from 'react';

type THandleLoad = {
  isLoading: boolean;
  hasError?: string;
};

export const useHandleLoad = (): [
  THandleLoad,
  (loading: boolean, error?: string) => void,
] => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState('');
  const handleLoad = (loading: boolean, error?: string) => {
    setIsLoading(loading);
    setHasError(!loading && error ? error : '');
  };
  return [{ isLoading, hasError }, handleLoad];
};
