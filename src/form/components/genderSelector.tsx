import { useState } from 'react';
import { TDataProps } from '../../constants/types';

export const GenderSelector = ({
  message,
  defaultValue,
  ...rest
}: TDataProps) => {
  const [[male, female], setGender] = useState(
    defaultValue === 'male' ? [true, false] : [false, true]
  );

  return (
    <div className="flex flex-col align-top">
      <fieldset className="flex justify-start">
        <legend className="text-start">Gender:</legend>
        <input
          {...rest}
          id="male"
          value={male ? 'male' : ''}
          className="mr-1"
          checked={male}
          onChange={() => setGender([true, false])}
        />
        <label htmlFor="male" className="mr-4">
          Male
        </label>
        <input
          {...rest}
          id="female"
          value={female ? 'female' : ''}
          className="mr-1"
          checked={female}
          onChange={() => setGender([false, true])}
        />
        <label htmlFor="female">Female</label>
      </fieldset>
      <p className="text-left first-letter:capitalize sm:h-4 h-8 w-full text-sm">
        {message}
      </p>
    </div>
  );
};
