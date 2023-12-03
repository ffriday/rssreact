import { TDataInput } from '../../constants/types';

export const ImageUpload = ({ props, message }: TDataInput) => (
  <div className="flex flex-col align-top">
    <input {...props} />
    <p className="text-left first-letter:capitalize sm:h-4 h-8 w-full text-sm">
      {message}
    </p>
  </div>
);
