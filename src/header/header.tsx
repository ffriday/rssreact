import { Link } from 'react-router-dom';
import { Style, navLinks } from '../constants';
import { useCurrentPage } from '../helpers';

export const Header = () => {
  const page = useCurrentPage();

  return (
    <header className="flex sm:flex-row flex-col mb-5">
      <div className="flex flex-row">
        <p className="sm:text-2xl text-xl animate-pulse mr-1 font-semibold">
          {'>'}
        </p>
        <h1 className="flex justify-start sm:text-2xl text-xl sm:mr-10 mr-1 font-semibold">
          RSS Form
        </h1>
      </div>
      <nav className={`flex flex-row gap-7 `}>
        {navLinks.map(([link, text]) => (
          <Link
            key={link}
            to={link}
            className={`flex items-end ${Style.textHover}${
              page === link ? ` ${Style.textActive}` : ''
            }`}
          >
            {text}
          </Link>
        ))}
      </nav>
    </header>
  );
};
