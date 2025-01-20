import React from 'react';
import Header from './Header';
import { tv } from 'tailwind-variants';
import Footer from './Footer';

const pageClass = tv({
  base: 'flex flex-col min-h-screen',
  variants: {
    header: {
      true: 'pt-15',
      false: '',
    },
  },
});

interface PageProps {
  children: React.ReactNode;
  className?: string;
  header?: boolean;
  showHeaderNav?: boolean;
}

const Page: React.FC<PageProps> = ({
  children,
  header = true,
  className = '',
  showHeaderNav = true,
}) => {
  return (
    <>
      {header ? <Header showNav={showHeaderNav} /> : null}

      <main className={pageClass({ class: className, header })}>{children}</main>
      <Footer />
    </>
  );
};

export default Page;
