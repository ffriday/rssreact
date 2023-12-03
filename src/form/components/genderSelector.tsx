import { TDataInput } from '../../constants/types';

export const GenderSelector = ({ props, message }: TDataInput) => {
  const errorStyle = message ? ' rounded border-2 border-red-400' : '';

  return (
    <div className={`flex flex-col align-top ${errorStyle}`}>
      <fieldset className="flex justify-start">
        <legend className="text-start">Gender:</legend>
        <input {...props} id="male" className="mr-1" />
        <label htmlFor="male" className="mr-4">
          Male
        </label>
        <input {...props} id="female" className="mr-1" />
        <label htmlFor="female">Female</label>
      </fieldset>
      <p className="text-left first-letter:capitalize sm:h-4 h-8 w-full text-sm">
        {message}
      </p>
    </div>
  );
};
