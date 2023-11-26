import { TLayoutChild } from ".";

export const RootLayout = ({ children }: TLayoutChild) => {
  return (
    <div className="flex flex-col justify-top h-full w-full bg-gray-700 font-mono">
      {children}
    </div>
  );
};
