import { FormNames } from '../../constants/types';

type TGenderSelector = {
  message: string;
};

export const GenderSelector = ({ message }: TGenderSelector) => (
  <div className="flex flex-col align-top">
    <fieldset className="flex justify-start">
      <legend className="text-start">Gender:</legend>
      <input
        type="radio"
        id="male"
        name={FormNames.gender}
        value="male"
        className="mr-1"
      />
      <label htmlFor="male" className="mr-4">
        Male
      </label>
      <input
        type="radio"
        id="female"
        name={FormNames.gender}
        value="female"
        className="mr-1"
      />
      <label htmlFor="female">Female</label>
    </fieldset>
    <p className="text-left first-letter:capitalize sm:h-4 h-8 w-full text-sm">
      {message}
    </p>
  </div>
);
