import { Avatar, Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { userStore } from "../store/UserStore";
import { IComment } from "../types/comment";
import { IUser } from "../types/user";

interface CommentBlockProps {
  comments: IComment[];
}

const CommentBlock: React.FC<CommentBlockProps> = ({comments}) => {
  console.log(comments)
  return (
    <Grid>
      <Grid sx={{display: 'flex', flexDirection: 'column', gap: '15px', border: '1px solid grey', padding: '10px'}}>
        <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}} >
          <Avatar src={userStore.userState?.avatarUrl} />
          <Typography fontSize={20} >{userStore.userState?.fullName}</Typography>
        </Box>
        <TextField 
        label="Оставить комментарий..."
        fullWidth
        />
      </Grid>
      {comments.map((comment) => 
      <Grid key={comment._id}>
        <Box>
          <Avatar src={comment.user.avatarUrl} />
          <Typography>{comment.user.fullName}</Typography>
        </Box>
        <Typography>{comment.text}</Typography>
      </Grid>
      )}
    </Grid>
  )
}

export default CommentBlock;