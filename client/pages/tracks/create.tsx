import FileUpload from '../../components/FileUpload';
import { Button, Grid } from '@mui/material';
import React from 'react';
import FirstStep from '../../components/FirstStep';
import StepWrapper from '../../components/StepWrapper';
import MainLayout from '../../layouts/MainLayout';

const Create = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  const next = () => {
    if (activeStep !== 2) {
      setActiveStep(prev => prev + 1)
    }
  }
  const back = () => {
    setActiveStep(prev => prev - 1)
  }

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 &&
          <FirstStep/>   
        }
        {activeStep === 1 &&
          <FileUpload file='' setFile={() => ({})} />   
        }
        {activeStep === 2 &&
          <h1>STEP 3</h1>   
        }
      </StepWrapper>
      <Grid container justifyContent='space-between'>
        <Button 
        onClick={back}
        disabled={activeStep === 0}
        >
          Назад
        </Button>
        <Button 
        onClick={next}
        >
          Далее
        </Button>
      </Grid>
    </MainLayout>
  )
}

export default Create;