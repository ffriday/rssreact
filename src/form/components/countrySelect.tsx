import { FormNames } from '../../constants/types';
import { useAppSelector } from '../../store/store';

type TCountrySelect = {
  message: string;
};

export const CountrySelect = ({ message }: TCountrySelect) => {
  const errorStyle = message ? ' border-red-400' : '';
  const data = useAppSelector((state) => state.countryReducer);

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
  };

  return (
    <div className="flex flex-col align-top w-full">
      <label htmlFor={FormNames.country} className="text-start">
        Country:
      </label>
      <input
        type="text"
        name={FormNames.country}
        id={FormNames.country}
        onChange={change}
        list="countryList"
        className={`text-gray-900 placeholder-black::placeholder h-8 rounded border-2${errorStyle}`}
      />
      <datalist id="countryList">
        {data.countries.map(({ name }) => (
          <option key={name} value={name} />
        ))}
      </datalist>
      <p className="text-left first-letter:capitalize sm:h-4 h-8 w-full text-sm">
        {message}
      </p>
    </div>
  );
};
