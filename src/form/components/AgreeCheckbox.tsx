import { FormNames } from '../../constants/types';

type TAgreeCheckbox = {
  message: string;
};

export const AgreeCheckbox = ({ message }: TAgreeCheckbox) => (
  <div className="flex flex-col align-top">
    <div className="flex justify-start">
      <input type="checkbox" name={FormNames.confirm} className="mr-1" />
      <label htmlFor="accept">Accept T&C</label>
    </div>
    <p className="text-left first-letter:capitalize sm:h-4 h-8 w-full text-sm">
      {message}
    </p>
  </div>
);
