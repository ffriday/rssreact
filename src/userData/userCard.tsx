import { useEffect } from 'react';
import { TFormData } from '../constants';
import { removeCard, useAppDispatch } from '../store';
import { CardItem } from './cardItem';

type TUserCard = TFormData & {
  first?: boolean;
};

export const UserCard = ({
  name,
  age,
  email,
  password,
  country,
  gender,
  accept,
  image,
  first,
}: TUserCard) => {
  const dispatch = useAppDispatch();
  const img = new Image();
  img.src = image;

  useEffect(() => {
    if (first) window.setTimeout(() => dispatch(removeCard()), 5000);
  }, [dispatch, first]);
  const updatedStyle = first ? ' border-green-500' : '';

  return (
    <div
      className={`flex flex-col items-start align-top p-3 border rounded sm:w-3/4 md:w-2/3 lg:w-1/2 w-2/3${updatedStyle}`}
    >
      <CardItem caption="Name" text={name} />
      <CardItem caption="Age" text={age.toString()} />
      <CardItem caption="Email" text={email} />
      <CardItem caption="Password" text={password} />
      <CardItem caption="Country" text={country} />
      <CardItem caption="Gender" text={gender} />
      <CardItem caption="T&C confirmed" text={accept ? 'yes' : ''} />
      <img
        src={image}
        alt="Image"
        className="m-2 rounded max max-w-xs w-11/12 max-h-96 self-center object-contain"
      />
    </div>
  );
};
