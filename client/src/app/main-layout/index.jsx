import React from 'react';
import Header from '../../widgets/header';
import MainNavigation from '../../widgets/main-navigation';
import './styles/index.scss';

const MainLayout = ({children}) => {
  return (
    <>
      <Header />
      <MainNavigation />
      <main className="main-wrapper">
        {children}
      </main>
    </>
  );
};

export default MainLayout;
