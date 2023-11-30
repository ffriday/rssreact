import { navLinks } from '../constants';
import { FormNames } from '../constants/types';
import { updateComponentData } from '../store';
import { useAppDispatch, useAppSelector } from '../store/store';
import { AgreeCheckbox, SubmitButton } from './components';
import { GenderSelector } from './components/genderSelector';
import { fillSchema, formSchema } from './components/schema';

export const UsualForm = () => {
  const inputStyle = 'text-gray-900 placeholder-current::placeholder';
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.componentReducer);

  const sumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = fillSchema(event.currentTarget);
    const valid = await formSchema.isValid(data);
    if (valid) {
      dispatch(updateComponentData(formSchema.cast(data)));
    } else {
      console.log('WRONG'); //TODO
    }
  };

  return (
    <section className="flex flex-col items-center w-full gap-5">
      <h2 className="uppercase font-semibold text-base tracking-wide">
        {navLinks[1][1]}
      </h2>
      <form
        onSubmit={sumbit}
        className="flex flex-col items-start min-w-min w-2/3 gap-2"
      >
        <input
          type="text"
          name={FormNames.name}
          placeholder="Name"
          defaultValue={data.name}
          className={inputStyle}
        ></input>
        <input
          type="number"
          name={FormNames.age}
          placeholder="Age"
          defaultValue={data.age}
          className={inputStyle}
        ></input>
        <input type="email" placeholder="Email" className={inputStyle}></input>
        <input
          type="password"
          placeholder="Password"
          className={inputStyle}
        ></input>
        <input
          type="password"
          placeholder="Confirm password"
          className={inputStyle}
        ></input>
        <input
          type="country"
          placeholder="Country"
          className={inputStyle}
        ></input>
        <GenderSelector />
        <input type="image" />
        <AgreeCheckbox />
        <SubmitButton />
      </form>
    </section>
  );
};
