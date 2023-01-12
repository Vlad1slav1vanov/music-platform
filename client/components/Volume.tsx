import { VolumeDown, VolumeUp } from "@mui/icons-material";
import { Box, Slider } from "@mui/material";
import React from "react";
import styled from "styled-components";

interface VolumeProps {
  left: number;
  right: number;
  onChange: (evt: React.ChangeEvent) => void;
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

const Volume: React.FC<VolumeProps> = ({left, right, onChange}) => {
  return (
    <StyledVolume>
      <VolumeDown />
      <Slider color="secondary" min={0} max={100} valueLabelDisplay="auto" />
      <VolumeUp />
    </StyledVolume>
  )
}

export default Volume;