import React from 'react';
import { tv } from 'tailwind-variants';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { path: '/', text: 'Inicio' },
  { path: '/login', text: 'Login' },
];
const styles = tv({
  slots: {
    headerStyle:
      'flex justify-between w-full fixed z-20 bg-secondaryScale-light top-0 py-6 px-6 shadow-sm',
    menuStyle: 'flex',
    imageStyle: 'h-12 w-12 rounded-xxl',
    navStyle: 'ml-8 flex justify-center items-center bg-',
    ulStyle: 'flex gap-6',
    buttonStyle:
      'flex justify-center items-center py-3 px-4 rounded-sm gap-2 text-branding-primary bg-greyScale-white hover:bg-primaryScale-clear active:bg-primaryScale-light r-0',
  },
});

const { headerStyle, menuStyle, imageStyle, navStyle, ulStyle, buttonStyle } = styles();

interface HeaderProps {
  showNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showNav = true }) => {
  const { pathname } = useLocation();
  return (
    <header className={headerStyle()}>
      <div className={menuStyle()}>
        <img
          loading="lazy"
          src="/assets/logo-beaches.svg"
          alt="beaches logo"
          className={imageStyle()}
        />

        {showNav ? (
          <nav className={navStyle()}>
            <ul className={ulStyle()}>
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-tertiaryScale-medium ${
                      pathname === link.path ? 'underline font-bold' : 'opacity-70'
                    }`}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
      <div className="flex justify-end p-5">
        <button className={buttonStyle()}>Adicionar nova praia</button>
      </div>
    </header>
  );
};

export default Header;
