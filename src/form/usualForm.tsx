import { useState } from 'react';
import { ValidationError } from 'yup';
import { inputs, navLinks, FormNames, Links } from '../constants';
import { addCard, updateComponentData, useAppDispatch } from '../store';
import {
  AgreeCheckbox,
  SubmitButton,
  DataInput,
  GenderSelector,
  fillSchema,
  formSchema,
  ImageUpload,
  CountrySelect,
} from './components';
import { findError, getValidationErrors, toBase64 } from '../helpers';
import { useNavigate } from 'react-router-dom';

export const UsualForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ValidationError>();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = fillSchema(event.currentTarget);
    const valid = await formSchema.isValid(data);
    if (valid) {
      const validated = formSchema.cast(data);
      const next = {
        ...validated,
        image: ((await toBase64(validated.image)) ?? '').toString(),
      };
      dispatch(updateComponentData(next));
      dispatch(addCard());
      setErrors(new ValidationError(''));
      navigate(`/${Links.home}`);
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
        onSubmit={submit}
        className="flex flex-col items-start min-w-min w-4/5 gap-2"
      >
        <DataInput
          props={{ ...inputs.name }}
          message={findError(errors, FormNames.name)}
        />
        <DataInput
          props={{ ...inputs.age }}
          message={findError(errors, FormNames.age)}
        />
        <DataInput
          props={{ ...inputs.email }}
          message={findError(errors, FormNames.email)}
        />
        <DataInput
          props={{ ...inputs.password }}
          message={findError(errors, FormNames.password)}
        />
        <DataInput
          props={{ ...inputs.confirm }}
          message={findError(errors, FormNames.confirm)}
        />
        <CountrySelect
          props={{ ...inputs.country }}
          message={findError(errors, FormNames.country)}
        />
        <GenderSelector
          props={{ ...inputs.gender }}
          message={findError(errors, FormNames.gender)}
        />
        <ImageUpload
          props={{ ...inputs.image }}
          message={findError(errors, FormNames.image)}
        />
        <AgreeCheckbox
          props={{ ...inputs.accept }}
          message={findError(errors, FormNames.accept)}
        />
        <SubmitButton />
      </form>
    </section>
  );
};
