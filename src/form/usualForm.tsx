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
import { findError, getValidationErrors } from '../helpers/functions';
import { FormNames } from '../constants/types';

export const UsualForm = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.componentReducer);
  const [errors, setErrors] = useState<ValidationError>();
  const [confirmError, setConfirmError] = useState(true);

  const inputStyle = 'text-gray-900 placeholder-current::placeholder';

  const sumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = fillSchema(event.currentTarget);
    const valid = await formSchema.isValid(data);
    const pwdMatches = data.password === data.confirm;
    setConfirmError(pwdMatches);
    if (valid && pwdMatches) {
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
        className="flex flex-col items-start min-w-min w-4/5 gap-2"
      >
        <DataInput
          props={{ ...inputs.name, defaultValue: data.name }}
          message={findError(errors, FormNames.name)}
        />
        <DataInput
          props={{ ...inputs.age, defaultValue: data.age.toString() }}
          message={findError(errors, FormNames.age)}
        />
        <DataInput
          props={{ ...inputs.email, defaultValue: data.email }}
          message={findError(errors, FormNames.email)}
        />
        <DataInput
          props={{ ...inputs.password, defaultValue: data.password }}
          message={findError(errors, FormNames.password)}
        />
        <DataInput
          props={{ ...inputs.confirm, defaultValue: '' }}
          message={!confirmError ? 'Password not match' : ''}
        />
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
