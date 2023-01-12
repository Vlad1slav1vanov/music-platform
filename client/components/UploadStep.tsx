import { Button, Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import FileUpload from "./FileUpload";

interface UploadStepProps {
  title?: string;
  setFile: Function;
  accept: string;
}

const UploadStep: React.FC<UploadStepProps> = ({title, setFile, accept}) => {
  return (
    <Grid container p={2} alignItems='center' direction='column'>
      <h1>{title}</h1>
      <FileUpload setFile={setFile} accept={accept}/>
    </Grid>
  )
}

export default UploadStep;