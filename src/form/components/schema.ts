import { object, string, number, setLocale } from 'yup';
import { FormNames } from '../../constants/types';

setLocale({
  string: {
    matches(params) {
      if (
        params.regex.source === /^[A-Z][a-z]*$/.source &&
        params.regex.flags === /^[A-Z][a-z]*$/.flags
      ) {
        return 'Must start from uppercase letter';
      }
    },
  },
});

export const formSchema = object({
  name: string()
    .matches(/^[A-Z][a-z]*$/, { excludeEmptyString: true })
    .required(),
  age: number().required(),
  email: string().email(),
});

export const fillSchema = (target: EventTarget & HTMLFormElement) => {
  const formData = new FormData(target);
  return {
    name: formData.get(FormNames.name),
    age: formData.get(FormNames.age),
  };
};
