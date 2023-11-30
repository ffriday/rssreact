import { fillSchema, formSchema } from '../form/components/schema';
import { ValidationError } from 'yup';

export const getValidationErrors = async (
  data: ReturnType<typeof fillSchema>
) =>
  (await formSchema
    .validate(data, { abortEarly: false })
    .catch((error) => error)) as ValidationError;
