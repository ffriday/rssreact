import { object, string, number, setLocale } from 'yup';
import { FormNames } from '../constants/types';
import { countries } from '../constants';

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
  [FormNames.country]: string()
    .required()
    .test({
      name: 'inCountryList',
      test(value, err) {
        if (value && countries.filter(({ name }) => value === name).length) {
          return true;
        } else {
          return err.createError({ message: 'Must be from list' });
        }
      },
    }),
  [FormNames.gender]: string().required(),
  [FormNames.confirm]: string().required(),
  [FormNames.image]: string().required(),
  [FormNames.accept]: string().required(),
});

export const fillSchema = (target: EventTarget & HTMLFormElement) => {
  const formData = new FormData(target);
  return Object.values(FormNames).reduce<Record<string, FormDataEntryValue>>(
    (acc, val) => {
      acc[val] = formData.get(val) ?? '';
      return acc;
    },
    {}
  );
};
