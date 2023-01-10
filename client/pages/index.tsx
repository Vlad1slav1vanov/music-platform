import React from 'react';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayout';

const Center = styled.div`
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const HomePage: React.FC = () => {
  return (
    <>
      <MainLayout>
        <Center>
          <h1>Добро пожаловать!</h1>
          <h3>Здесь собраны лучшие треки!</h3>
        </Center>
      </MainLayout>
    </>
  )
}

export default HomePage;