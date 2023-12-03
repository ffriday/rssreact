import { TDataInput } from '../../constants/types';

export const ImageUpload = ({ props, message }: TDataInput) => {
  const errorStyle = message ? ' rounded border-2 border-red-400' : '';

  return (
    <div className={`flex flex-col align-top ${errorStyle}`}>
      <input {...props} />
      <p className="text-left first-letter:capitalize sm:h-4 h-8 w-full text-sm">
        {message}
      </p>
    </div>
  );
};
