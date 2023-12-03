import { TDataProps } from '../../constants/types';

export const AgreeCheckbox = ({ message, ...rest }: TDataProps) => {
  return (
    <div className="flex flex-col align-top">
      <div className="flex justify-start">
        <input {...rest} className="mr-1" />
        <label htmlFor="accept">Accept T&C</label>
      </div>
      <p className="text-left first-letter:capitalize sm:h-4 h-8 w-full text-sm">
        {message}
      </p>
    </div>
  );
};
