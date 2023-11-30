type TDataInput = {
  props: {
    type: string;
    name: string;
    placeholder: string;
    defaultValue: string;
  };
  message: string;
  onChange?: (value: string) => void;
};

export const DataInput = ({ props, message, onChange }: TDataInput) => {
  const errorStyle = message ? ' border-red-400' : '';
  return (
    <div className="flex flex-col justify-start w-full">
      <label className="text-left first-letter:capitalize" htmlFor={props.name}>
        {props.name}
      </label>
      <input
        {...props}
        onChange={(event) => onChange && onChange(event.currentTarget.value)}
        className={`text-gray-900 placeholder-current::placeholder h-8 rounded border-2${errorStyle}`}
      ></input>
      <p className="text-left first-letter:capitalize sm:h-4 h-8 w-full text-sm">
        {message}
      </p>
    </div>
  );
};
