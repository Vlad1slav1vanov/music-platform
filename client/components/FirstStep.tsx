import { Grid, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledFirstStep = styled(Grid)`
  direction: column;
  padding: 20px;
  gap: 15px;
`

const FirstStep: React.FC = () => {
  return (
    <StyledFirstStep container>
      <h1>Напишите информацию о песне</h1>
      <TextField
      fullWidth
      label="Название трека"
      />
      <TextField
      fullWidth
      label="Имя автора"
      />
      <TextField
      fullWidth
      label="Текст песни"
      multiline
      rows={3}
      />
    </StyledFirstStep>
  )
}

export default FirstStep;