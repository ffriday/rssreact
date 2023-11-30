import { TFormData } from '../store/formSlice';

export const UserCard = ({ name }: TFormData) => {
  return <h1>NAME {name}</h1>;
};
