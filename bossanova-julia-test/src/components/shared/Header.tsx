import React, { useState } from 'react';
import { tv } from 'tailwind-variants';
import { Link, useLocation } from 'react-router-dom';
import { Beach } from '../../axios';
import Icon from '../UI/Icon';
import ModalAdd from '../UI/ModalAdd';
import { useAtom } from 'jotai';
import { beachesAtom } from '../../atoms';

export type OmitBeach = Omit<Beach, 'id' | 'description' | 'image'>;

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
    navStyle: 'ml-8 flex justify-center items-center',
    ulStyle: 'flex gap-6',
    buttonStyle:
      'flex justify-center items-center py-3 px-4 rounded-sm gap-2 text-branding-primary bg-greyScale-white hover:bg-primaryScale-clear active:bg-primaryScale-light',
  },
});

const { headerStyle, menuStyle, imageStyle, navStyle, ulStyle, buttonStyle } = styles();

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [isAddBeachFormOpen, setIsAddBeachFormOpen] = useState(false);
  const [beaches, setBeaches] = useAtom(beachesAtom);

  const handleAddBeach = (newBeach: Beach): void => {
    setBeaches((prevBeaches) => [...prevBeaches, newBeach]);
    setIsAddBeachFormOpen(false);
  };

  return (
    <>
      <header className={headerStyle()}>
        <div className={menuStyle()}>
          <img
            loading="lazy"
            src="/assets/logo-beaches.svg"
            alt="beaches logo"
            className={imageStyle()}
          />

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
        </div>
        <div className="flex gap-4 justify-end p-5">
          <button className={buttonStyle()}>
            Procurar praia
            <Icon size={'20'} iconName={'RiSearchLine'} />
          </button>
          <button className={buttonStyle()} onClick={() => setIsAddBeachFormOpen(true)}>
            Adicionar nova praia
          </button>
        </div>
      </header>
      {isAddBeachFormOpen && (
        <ModalAdd
          isOpen={isAddBeachFormOpen}
          onClose={() => setIsAddBeachFormOpen(false)}
          onAddBeach={handleAddBeach}
        />
      )}
    </>
  );
};

export default Header;
