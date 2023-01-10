import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const Container = styled.div`
  margin: 90px;
`

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
  return (
    <>
      <Navbar />
      <Container>
        {children}
      </Container>
    </>
  )
}

export default MainLayout;