import React from 'react';
import { tv } from 'tailwind-variants';
import { Link } from 'react-router-dom';
import Icon from '../UI/Icon';

const links = [
  {
    path: 'https://www.linkedin.com/in/barcelos-julia/',
    text: 'LinkedIn',
    iconImage: 'RiLinkedinFill',
  },
  {
    path: 'https://github.com/jubarcelos',
    text: 'gitHub',
    iconImage: 'RiGithubFill',
  },
  {
    path: 'https://wa.me/5548991222729',
    text: 'contact',
    iconImage: 'RiWhatsappLine',
  },
];
const styles = tv({
  slots: {
    footerStyle: 'flex w-full fixed z-20 bg-secondaryScale-light bottom-0 py-6 px-6 shadow-sm',
    menuStyle: 'flex items-end',
    navStyle: 'flex items-center',
    ulStyle: 'flex gap-6',
  },
});

const { footerStyle, menuStyle, navStyle, ulStyle } = styles();

const Footer: React.FC = () => {
  return (
    <footer className={footerStyle()}>
      <div className={menuStyle()}>
        <nav className={navStyle()}>
          <ul className={ulStyle()}>
            {links.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>
                  <Icon size={'22'} iconName={link.iconImage} color="text-tertiaryScale-medium " />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
