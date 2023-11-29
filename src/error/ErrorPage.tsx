type TErrorPage = {
  message?: string;
};

export const ErrorPage = ({ message = 'Oops, error!' }: TErrorPage) => {
  return <p>{message}</p>;
};
