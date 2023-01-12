import { Button, Grid } from '@mui/material';
import React from 'react';
import StepWrapper from '../../components/StepWrapper';
import MainLayout from '../../layouts/MainLayout';

const Create = () => {
  return (
    <MainLayout>
      <StepWrapper activeStep={1}>
        <h1>Загрузка трека</h1>
      </StepWrapper>
      <Grid>
        <Button>Назад</Button>
        <Button>Далее</Button>
      </Grid>
    </MainLayout>
  )
}

export default Create;