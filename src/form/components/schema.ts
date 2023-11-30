import { object, string, number } from 'yup';
import { FormNames } from '../../constants/types';

export const formSchema = object({
  name: string()
    .matches(/^[A-Z][a-z]*$/, { excludeEmptyString: true })
    .required(),
  age: number().required(),
});

export const fillSchema = (target: EventTarget & HTMLFormElement) => {
  const formData = new FormData(target);
  return {
    name: formData.get(FormNames.name),
    age: formData.get(FormNames.age),
  };
};
