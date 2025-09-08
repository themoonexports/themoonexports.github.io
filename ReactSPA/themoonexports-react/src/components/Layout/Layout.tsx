import React, { ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
