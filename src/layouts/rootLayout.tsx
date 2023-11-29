import { Outlet } from 'react-router-dom';
import { Style } from '../constants';
import { Header } from '../header/header';

export const RootLayout = () => {
  return (
    <div
      className={`flex flex-col justify-top h-full w-full font-mono px-1 sm:px-3 ${Style.bgColor} ${Style.textColor}`}
    >
      <Header />
      <main className={`flex flex-row justify-top w-full font-mono`}>
        <Outlet />
      </main>
      <footer className={`w-full h-12`} />
    </div>
  );
};
