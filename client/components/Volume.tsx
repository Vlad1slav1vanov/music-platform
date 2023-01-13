import { VolumeDown, VolumeUp } from "@mui/icons-material";
import { Box, Slider } from "@mui/material";
import React from "react";
import styled from "styled-components";

interface VolumeProps {
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
}

const StyledVolume = styled(Box)`
  width: 180px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  color: white;
  margin-left: auto;
  gap: 15px;
`

const Volume: React.FC<VolumeProps> = ({onChange, value}) => {
  return (
    <StyledVolume>
      <VolumeDown />
      <Slider 
      color="secondary" 
      min={0} 
      max={100}
      value={value}
      onChange={onChange}
      valueLabelDisplay="auto" 
      />
      <VolumeUp />
    </StyledVolume>
  )
}

export default Volume;