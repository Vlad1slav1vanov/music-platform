import { Grid, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useInput } from "../hooks/useInput";

interface FirstStepProps {
  name: Object;
  artist: Object;
  text: Object;
}

const StyledFirstStep = styled(Grid)`
  direction: column;
  padding: 20px;
  gap: 15px;
`

const FirstStep: React.FC<FirstStepProps> = ({name, artist, text}) => {


  return (
    <StyledFirstStep container>
      <h1>Напишите информацию о песне</h1>
      <TextField
      {...name}
      fullWidth
      label="Название трека"
      />
      <TextField
      {...artist}
      fullWidth
      label="Имя автора"
      />
      <TextField
      {...text}
      fullWidth
      label="Текст песни"
      multiline
      rows={3}
      />
    </StyledFirstStep>
  )
}

export default FirstStep;