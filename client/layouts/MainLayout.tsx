import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Player from '../components/Player';

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
      <Player />
    </>
  )
}

export default MainLayout;