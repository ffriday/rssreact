import { useEffect } from 'react';
import { useAddSearchMutation, useAppDispatch, useGetItemQuery } from "../store";

export default function Test() {
  const result = useGetItemQuery({uid: 'ASMA0000015822'});
  // console.log(result);
  // const dispatch = useAppDispatch();
  // const [loadList, { data }] = useAddSearchMutation();
  // console.log(data);

  // useEffect(() => {
  //   (async () => {
  //     await loadList({
  //       query: '',
  //       page: '1',
  //       size: '10',
  //     }).unwrap();
  //   })();
  // }, [loadList]);

  return <h1>{result.data?.astronomicalObject.name}</h1>;
}