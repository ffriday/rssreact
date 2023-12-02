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
  ImageUpload,
} from './components';
import { findError, getValidationErrors } from '../helpers/functions';
import { FormNames, TFormData } from '../constants/types';
import { CountrySelect } from './components/countrySelect';

export const UsualForm = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.componentReducer);
  const [errors, setErrors] = useState<ValidationError>();
  const [confirmError, setConfirmError] = useState(true);

  const sumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = fillSchema(event.currentTarget);
    const valid = await formSchema.isValid(data);
    const pwdMatches = data.password === data.confirm;
    setConfirmError(pwdMatches);
    if (valid && pwdMatches) {
      dispatch(updateComponentData(formSchema.cast(data) as TFormData));
      setErrors(new ValidationError(''));
    } else {
      setErrors(await getValidationErrors(data));
    }
    console.log(data);
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
          props={{ ...inputs.confirm, defaultValue: data.password }}
          message={!confirmError ? 'Password not match' : ''}
        />
        <CountrySelect
          {...inputs.country}
          defaultValue={data.country}
          message={findError(errors, FormNames.country)}
        />
        <GenderSelector
          {...inputs.gender}
          defaultValue={data.gender}
          message={findError(errors, FormNames.gender)}
        />
        <ImageUpload
          {...inputs.image}
          defaultValue={data.image}
          message={findError(errors, FormNames.image)}
        />
        <AgreeCheckbox
          {...inputs.accept}
          defaultValue={data.accept}
          message={findError(errors, FormNames.accept)}
        />
        <SubmitButton />
      </form>
    </section>
  );
};
