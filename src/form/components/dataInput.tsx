type TDataInput = {
  props: {
    type: string;
    name: string;
    placeholder: string;
    defaultValue: string;
    className: string;
  };
  message: string;
};

export const DataInput = ({ props, message }: TDataInput) => (
  <div className="flex flex-col justify-start">
    <label htmlFor={props.name}>{props.name}</label>
    <input {...props}></input>
    <p>{message}</p>
  </div>
);
