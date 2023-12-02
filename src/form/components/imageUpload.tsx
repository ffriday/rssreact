import { TDataProps } from '../../constants/types';

export const ImageUpload = ({ message, ...rest }: TDataProps) => (
  <div className="flex flex-col align-top">
    <input {...rest} />
    <p className="text-left first-letter:capitalize sm:h-4 h-8 w-full text-sm">
      {message}
    </p>
  </div>
);
