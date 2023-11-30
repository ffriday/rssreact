import { fillSchema, formSchema } from '../validation/schema';
import { ValidationError } from 'yup';

export const getValidationErrors = async (
  data: ReturnType<typeof fillSchema>
) =>
  (await formSchema
    .validate(data, { abortEarly: false })
    .catch((error) => error)) as ValidationError;

export const findError = (error: ValidationError | undefined, name: string) => {
  if (error) {
    const err = Object.values(error.inner).find(({ path }) => path === name);
    return err?.message ?? '';
  } else {
    return '';
  }
};
