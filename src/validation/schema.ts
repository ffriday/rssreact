import { object, string, number, setLocale } from 'yup';
import { FormNames } from '../constants/types';

setLocale({
  number: {},
});

export const formSchema = object({
  name: string()
    .matches(/^[A-Z][a-zA-Z]*$/, {
      excludeEmptyString: true,
      message: 'Must start from uppercase letter',
    })
    .required(),
  age: number()
    .typeError('Must be a number')
    .min(0, 'Must be higher then 0')
    .integer('Must be an integer')
    .required(),
  email: string().email().required(),
  password: string()
    .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d]).*$/, {
      excludeEmptyString: true,
      message: 'Must contain number, uppercase, lowercased, special character',
    })
    .required(),
});

export const fillSchema = (target: EventTarget & HTMLFormElement) => {
  const formData = new FormData(target);
  return {
    name: formData.get(FormNames.name),
    age: formData.get(FormNames.age),
    email: formData.get(FormNames.email),
    password: formData.get(FormNames.password),
    confirm: formData.get(FormNames.confirm),
  };
};
