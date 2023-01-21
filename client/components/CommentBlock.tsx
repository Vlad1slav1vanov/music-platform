import { Avatar, Box, Button, Card, Grid, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import { userStore } from "../store/UserStore";
import { IComment } from "../types/comment";
import dayjs from "dayjs";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

interface CommentBlockProps {
  comments: IComment[];
}

const CommentBlock: React.FC<CommentBlockProps> = ({comments}) => {
  console.log(comments)
  return (
    <Grid sx={{
      display: 'flex', 
      flexDirection: 
      'column', 
      gap: '40px' 
    }}>
      <Grid sx={{
        display: 'flex', 
        flexDirection: 'row', 
        gap: '15px', 
        alignItems: 'center'
      }}>
        <Avatar 
          src={userStore.userState?.avatarUrl}
          sx={{
            width: 50, 
            height: 50, 
            bgcolor: '#5824f3'
        }}/>        
        <TextField 
        label="Оставить комментарий..."
        multiline
        fullWidth
        />
        <Button variant='contained' >
          Отправить
        </Button>
      </Grid>
      {comments.map((comment) => 
      <Card 
      key={comment._id} 
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px', 
        border: '1px solid grey', 
        padding: '15px'
      }}>
        <Box 
        sx={{
        display: 'flex',
        justifyContent: 'space-between', 
        gap: '20px', 
        alignItems: 'center'
        }}>
          <Box 
          sx={{
          display: 'flex', 
          gap: '20px'
          }}>
            <Avatar 
              src={comment.user.avatarUrl}
              sx={{
                width: 40, 
                height: 40, 
                bgcolor: '#5824f3'
            }}/>
            <Typography fontSize={20}>
              {comment.user.fullName}
            </Typography>
          </Box>
          {userStore.userState?.userId === comment.user.userId
          &&
          <Box>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <ClearIcon color="error" />
            </IconButton>
          </Box>
          }
        </Box>
        <Typography 
        fontSize={18} 
        whiteSpace='pre'
        >
          {comment.text}
        </Typography>
        <Typography color="grey" >
          Опубликовано: {dayjs(comment.createdAt).format("DD.MM.YY")}
        </Typography>
      </Card>
      )}
    </Grid>
  )
}

export default CommentBlock;