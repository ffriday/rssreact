type TDataInput = {
  props: {
    type: string;
    name: string;
    placeholder: string;
    defaultValue: string;
  };
  message: string;
};

export const DataInput = ({ props, message }: TDataInput) => {
  const errorStyle = message ? ' border-red-400' : '';
  return (
    <div className="flex flex-col justify-start w-full">
      <label className="text-left first-letter:capitalize" htmlFor={props.name}>
        {props.name}
      </label>
      <input
        {...props}
        className={`text-gray-900 placeholder-current::placeholder rounded border-2${errorStyle}`}
      ></input>
      <p className="text-left first-letter:capitalize h-4 w-full text-sm">
        {message}
      </p>
    </div>
  );
};
