import { object, string, number, setLocale, mixed, ref } from 'yup';
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
      message: 'Must be from list',
      test(value) {
        if (value && countries.filter(({ name }) => value === name).length)
          return true;
        return false;
      },
    }),
  [FormNames.gender]: string().required(),
  [FormNames.confirm]: string()
    .oneOf([ref(FormNames.password)], 'Password not match')
    .required(),
  [FormNames.image]: mixed((value): value is File => value instanceof File)
    .required()
    .test({
      name: 'size',
      message: 'Must be less then 1mb',
      test(value) {
        const file = value as File;
        if (file.size <= 1000000) return true;
        return false;
      },
    })
    .test({
      name: 'extension',
      message: 'Must be png or jpeg',
      test(value) {
        const file = value as File;
        if (file.type === 'image/jpeg' || file.type === 'image/png')
          return true;
        return false;
      },
    })
    .transform((value) => {
      if (value.length) return value[0];
      return value;
    }),
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
