import { useAsyncValue } from 'react-router-dom';
// import MessageBox from '../messageBox/messageBox';
import { TSingleAstronomicalObject } from '../constants/types';
import { useState } from 'react';

export default function AstroItem(): JSX.Element {
  const item = useAsyncValue() as TSingleAstronomicalObject;
  const [isExist, setIsExist] = useState(false);
  setIsExist(item && Boolean(item.uid));

  return isExist ? <div>{item.uid}</div> : <></>;
}
