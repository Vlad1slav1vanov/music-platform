import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import ClippedDrawer from '../components/layout-parts/ClippedDrawer';
import Player from '../components/player/Player';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  searchIsAvailable?: boolean;
}

const Container = styled.div`
  margin: 90px;
`

const MainLayout: React.FC<MainLayoutProps> = ({children, title, description, keywords, searchIsAvailable}) => {
  return (
    <>
      <Head>
        <title>{title || "Музыкальная платформа"}</title>
        <meta name="description" content={"Музыкальная платформа. Здесь Вы можете послушать музыку, загрузить свою песню, найти песню себе по душе" + description}/>
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords || "Музыка, треки, артисты"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ClippedDrawer searchIsAvailable={searchIsAvailable}>
        {children}
      </ClippedDrawer>
      <Player />
    </>
  )
}

export default MainLayout;