import { TDataProps } from '../../constants/types';

export const GenderSelector = ({ message, ...rest }: TDataProps) => {
  return (
    <div className="flex flex-col align-top">
      <fieldset className="flex justify-start">
        <legend className="text-start">Gender:</legend>
        <input {...rest} id="male" className="mr-1" />
        <label htmlFor="male" className="mr-4">
          Male
        </label>
        <input {...rest} id="female" className="mr-1" />
        <label htmlFor="female">Female</label>
      </fieldset>
      <p className="text-left first-letter:capitalize sm:h-4 h-8 w-full text-sm">
        {message}
      </p>
    </div>
  );
};
