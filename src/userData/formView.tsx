import { useAppSelector } from '../store/store';
import { UserCard } from './userCard';

export const FormView = () => {
  const componentData = useAppSelector((state) => state.componentReducer);
  const updated = useAppSelector((state) => state.updateReducer);

  return (
    <>
      {componentData.length ? (
        <section className="w-full flex flex-col gap-5 items-center">
          {componentData.map((data, i) => (
            <UserCard
              key={`${data.name}-${Date().toString()}`}
              {...data}
              first={i === 0 && updated.updated}
            />
          ))}
        </section>
      ) : (
        <p className="p-2">NO DATA</p>
      )}
    </>
  );
};
