import { TFormData } from '../constants';
import { CardItem } from './cardItem';

export const UserCard = ({
  name,
  age,
  email,
  password,
  country,
  gender,
  confirm,
  image,
}: TFormData) => {
  return (
    <section>
      <CardItem caption="Name" text={name} />
      <CardItem caption="Age" text={age.toString()} />
      <CardItem caption="Email" text={email} />
      <CardItem caption="Password" text={password} />
      <CardItem caption="Country" text={country} />
      <CardItem caption="Gender" text={gender} />
      <CardItem caption="T&C confirmed" text={confirm} />
      <CardItem caption="Image" text={image} />
    </section>
  );
};
