import { TLayoutChild } from ".";

export const SearchLayout = ({ children }: TLayoutChild) => {
  return (
      <header className="flex flex-row flex-wrap">
        <h1 className="text-xl sm:text-2xl w-screen sm:w-max sm:pr-10 font-bold text-red-400 text-left ml-2">
          RSS Astro Objects
        </h1>
        <nav className="h-15 sm:h-10 flex flex-row flex-wrap content-center justify-start pb-2">
          {children}
        </nav>
      </header>
  );
};
