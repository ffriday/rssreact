import { TFormData } from '../constants';
import { CardItem } from './cardItem';

export const UserCard = ({
  name,
  age,
  email,
  password,
  country,
  gender,
  accept,
  image,
}: TFormData) => {
  const img = new Image();
  img.src = image;
  return (
    <div className="flex flex-col items-start align-top p-3 border rounded sm:w-3/4 md:w-2/3 lg:w-1/2 w-2/3">
      <CardItem caption="Name" text={name} />
      <CardItem caption="Age" text={age.toString()} />
      <CardItem caption="Email" text={email} />
      <CardItem caption="Password" text={password} />
      <CardItem caption="Country" text={country} />
      <CardItem caption="Gender" text={gender} />
      <CardItem caption="T&C confirmed" text={accept && 'yes'} />
      <img
        src={image}
        alt="Image"
        className="m-2 rounded max max-w-xs w-11/12 max-h-96 self-center"
      />
    </div>
  );
};
