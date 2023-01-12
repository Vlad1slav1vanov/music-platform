import { Stepper, Container, Step, StepLabel, Grid, Card } from "@mui/material";
import React from "react";
import styled from "styled-components";

interface StepWrapperProps {
  activeStep: number;
  children?: React.ReactNode;
}

const steps = ['Информация о треке', 'Загрузите обложку', 'Загрузите аудио'];

const StyledGrid = styled(Grid)`
justify-content: center;
margin: 70px 0;
height: 270px;
`
const StyledCard = styled(Card)`
width: 600px;
`

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) =>
          <Step 
          key={index}
          completed={activeStep > index}
          >
            <StepLabel>{step}</StepLabel>
          </Step>  
        )}
      </Stepper>
      <StyledGrid container>
          <StyledCard>
            {children}
          </StyledCard>
      </StyledGrid>
    </Container>
  )
}

export default StepWrapper;