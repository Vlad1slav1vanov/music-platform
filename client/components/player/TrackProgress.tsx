import { Slider, Box } from "@mui/material";
import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

interface TrackProgressProps {
  left: number;
  right: number;
  value: number;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledTime = styled.div`
  width: 30px;
  color: white;
  font-size: 14px;
`

const StyledTrackProgress = styled(Box)`
  width: 700px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  color: white;
`

const TrackProgress: React.FC<TrackProgressProps> = ({left, right, onChange, value}) => {

  return (
    <StyledTrackProgress>
      <StyledTime>{dayjs(left*1000).format('mm:ss')}</StyledTime>
      <Box width={600}>
        <Slider 
        color='secondary' 
        onChange={onChange} 
        min={0} 
        max={right}
        value={value}
        />
      </Box>
      <StyledTime>{dayjs(right*1000).format('mm:ss')}</StyledTime>
    </StyledTrackProgress>
  )
}

export default TrackProgress;