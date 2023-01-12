import { Slider, Box } from "@mui/material";
import React from "react";
import styled from "styled-components";

interface TrackProgressProps {
  left: number;
  right: number;
  onChange: (evt: React.ChangeEvent) => void;
}

const StyledTime = styled.div`
  width: 30px;
  color: white;
  font-size: 14px;
`

const StyledTrackProgress = styled(Box)`
  width: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  color: white;
`

const TrackProgress: React.FC<TrackProgressProps> = ({left, right, onChange}) => {
  return (
    <StyledTrackProgress>
      <StyledTime>{left}</StyledTime>
      <Box width={300}>
        <Slider color='secondary' />
      </Box>
      <StyledTime>{right}</StyledTime>
    </StyledTrackProgress>
  )
}

export default TrackProgress;