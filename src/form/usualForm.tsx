import { useState } from 'react';
import { ValidationError } from 'yup';
import { inputs, navLinks } from '../constants';
import { updateComponentData } from '../store';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  AgreeCheckbox,
  SubmitButton,
  DataInput,
  GenderSelector,
  fillSchema,
  formSchema,
} from './components';
import { getValidationErrors } from '../helpers/functions';

export const UsualForm = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.componentReducer);
  const [errors, setErrors] = useState<ValidationError>();

  const inputStyle = 'text-gray-900 placeholder-current::placeholder';

  const sumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = fillSchema(event.currentTarget);
    const valid = await formSchema.isValid(data);
    if (valid) {
      dispatch(updateComponentData(formSchema.cast(data)));
      setErrors(new ValidationError(''));
    } else {
      setErrors(await getValidationErrors(data));
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
        <DataInput
          props={{ ...inputs.name, defaultValue: data.name }}
          message={errors?.errors[0] || ''}
        />
        <DataInput
          props={{ ...inputs.age, defaultValue: data.age.toString() }}
          message={errors?.errors[1] || ''}
        />
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
