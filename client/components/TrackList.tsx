import { Grid, Box } from "@mui/material";
import React from "react";
import { ITrack } from "../types/track";
import TrackItem from "./TrackItem";

interface TrackListProps {
  tracks: ITrack[];
}

const TrackList: React.FC<TrackListProps> = ({tracks}) => {
  return (
    <Grid container direction='column'>
      {tracks.map(track =>
        <Box p={2} key={track._id} >
          <TrackItem 
          track={track}
          />
        </Box> 
      )}
    </Grid>
  )
}

export default TrackList;