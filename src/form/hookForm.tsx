import { useForm } from 'react-hook-form';
import { FormNames, inputs, navLinks } from '../constants';
import {
  AgreeCheckbox,
  CountrySelect,
  DataInput,
  GenderSelector,
  ImageUpload,
  SubmitButton,
  formSchema,
} from './components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Links, TFormValidate } from '../constants/types';
import { addCard, updateComponentData, useAppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import { toBase64 } from '../helpers';

export const HookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValidate>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submit = async (data: TFormValidate) => {
    if (data) {
      const validated = formSchema.cast(data);
      const next = {
        ...validated,
        image: ((await toBase64(validated.image)) ?? '').toString(),
      };
      dispatch(updateComponentData(next));
      dispatch(addCard());
      navigate(`/${Links.home}`);
    }
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
        <DataInput
          props={{ ...inputs.age, ...register(FormNames.age) }}
          message={errors[FormNames.age]?.message ?? ''}
        />
        <DataInput
          props={{ ...inputs.email, ...register(FormNames.email) }}
          message={errors[FormNames.email]?.message ?? ''}
        />
        <DataInput
          props={{ ...inputs.password, ...register(FormNames.password) }}
          message={errors[FormNames.password]?.message ?? ''}
        />
        <DataInput
          props={{ ...inputs.confirm, ...register(FormNames.confirm) }}
          message={errors[FormNames.confirm]?.message ?? ''}
        />
        <CountrySelect
          props={{ ...inputs.country, ...register(FormNames.country) }}
          message={errors[FormNames.country]?.message ?? ''}
        />
        <GenderSelector
          props={{ ...inputs.gender, ...register(FormNames.gender) }}
          message={errors[FormNames.gender]?.message ?? ''}
        />
        <ImageUpload
          props={{ ...inputs.image, ...register(FormNames.image) }}
          message={errors[FormNames.image]?.message ?? ''}
        />
        <AgreeCheckbox
          props={{ ...inputs.accept, ...register(FormNames.accept) }}
          message={errors[FormNames.accept]?.message ?? ''}
        />
        <SubmitButton />
      </form>
    </section>
  );
};
