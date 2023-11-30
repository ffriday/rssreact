import { useAppSelector } from '../store/store';
import { UserCard } from './userCard';

export const FormView = () => {
  const componentData = useAppSelector((state) => state.componentReducer);
  const hookData = useAppSelector((state) => state.hookReducer);
  return (
    <>
      <UserCard {...componentData} />
      <UserCard {...hookData} />
    </>
  );
};
