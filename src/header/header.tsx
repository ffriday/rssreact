import { Link, useParams } from 'react-router-dom';
import { Links, Style, navLinks } from '../constants';

export const Header = () => {
  const { page } = useParams();
  const currentPage = page || Links.home;

  return (
    <header className="flex sm:flex-row flex-col sm:gap-10 gap-1">
      <h1 className="flex justify-start sm:text-2xl text-xl">RSS Form</h1>
      <nav className={`flex flex-row gap-7 `}>
        {navLinks.map(([link, text]) => (
          <Link
            key={link}
            to={link}
            className={`flex items-end ${Style.textHover}${
              currentPage === link ? ` ${Style.textActive}` : ''
            }`}
          >
            {text}
          </Link>
        ))}
      </nav>
    </header>
  );
};
