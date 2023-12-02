import { object, string, number, setLocale } from 'yup';
import { FormNames } from '../constants/types';

setLocale({
  number: {},
});

export const formSchema = object({
  [FormNames.name]: string()
    .matches(/^[A-Z][a-zA-Z]*$/, {
      excludeEmptyString: true,
      message: 'Must start from uppercase letter',
    })
    .required(),
  [FormNames.age]: number()
    .typeError('Must be a number')
    .min(0, 'Must be higher then 0')
    .integer('Must be an integer')
    .required(),
  [FormNames.email]: string().email().required(),
  [FormNames.password]: string()
    .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d]).*$/, {
      excludeEmptyString: true,
      message: 'Must contain number, uppercase, lowercased, special character',
    })
    .required(),
  [FormNames.country]: string().required(),
  [FormNames.gender]: string().required(),
  [FormNames.confirm]: string().required(),
  [FormNames.image]: string().required(),
});

export const fillSchema = (target: EventTarget & HTMLFormElement) => {
  const formData = new FormData(target);
  return {
    [FormNames.name]: formData.get(FormNames.name) ?? '',
    [FormNames.age]: formData.get(FormNames.age) ?? '',
    [FormNames.email]: formData.get(FormNames.email) ?? '',
    [FormNames.password]: formData.get(FormNames.password) ?? '',
    [FormNames.country]: formData.get(FormNames.country) ?? '',
    [FormNames.gender]: formData.get(FormNames.gender) ?? '',
    [FormNames.confirm]: formData.get(FormNames.confirm) ?? '',
    [FormNames.image]: formData.get(FormNames.image) ?? '',
  };
};
