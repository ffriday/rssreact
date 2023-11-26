import { TLayoutChild } from ".";

export const ContentLayout = ({ children }: TLayoutChild) => {
  return (
      <main className="bg-gray-700 flex flex-row w-full">
        {children}
      </main>
  );
};
