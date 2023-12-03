type TErrorPage = {
  message?: string;
};

export const ErrorPage = ({ message = 'Oops, error!' }: TErrorPage) => {
  return <p className="p-2 text-red-600">{message}</p>;
};
