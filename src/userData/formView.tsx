import { useAppSelector } from '../store/store';
import { UserCard } from './userCard';

export const FormView = () => {
  const componentData = useAppSelector((state) => state.componentReducer);

  return (
    <>
      <section className="w-full flex flex-col gap-5 items-center">
        {componentData.map((data) => (
          <UserCard key={`${data.name}-${Date().toString()}`} {...data} />
        ))}
      </section>
    </>
  );
};
