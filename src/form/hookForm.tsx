import { useForm } from 'react-hook-form';
import { FormNames, inputs, navLinks } from '../constants';
import { DataInput, SubmitButton, formSchema } from './components';
import { yupResolver } from '@hookform/resolvers/yup';
import { TFormValidate } from '../constants/types';

export const HookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValidate>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const submit = (data: TFormValidate) => {
    console.log(data);
  };

  return (
    <section className="flex flex-col items-center w-full gap-5">
      <h2 className="uppercase font-semibold text-base tracking-wide">
        {navLinks[2][1]}
      </h2>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col items-start min-w-min w-4/5 gap-2"
      >
        <DataInput
          props={{ ...inputs.name, ...register(FormNames.name) }}
          message={errors[FormNames.name]?.message ?? ''}
        />
        <SubmitButton />
      </form>
    </section>
  );
};
