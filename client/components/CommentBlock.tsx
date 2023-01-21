import { Avatar, Box, Button, Card, Grid, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import { userStore } from "../store/UserStore";
import { IComment } from "../types/comment";
import dayjs from "dayjs";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import axios from "../axios";
import { ITrack } from "../types/track";

interface CommentBlockProps {
  comments: IComment[];
  track: ITrack;
  setTrack: React.Dispatch<React.SetStateAction<ITrack>>;
}

const CommentBlock: React.FC<CommentBlockProps> = ({comments, track, setTrack}) => {
  const [comment, setComment] = React.useState('');
  const postComment = async () => {
    try {
      const request = {
        trackId: track._id,
        text: comment,
      };
      const {data} = await axios.post('/tracks/comment', request);
      if (userStore.userState) {
        const newComment: IComment = {
          _id: data._id,
          createdAt: data.createdAt,
          text: data.text,
          user: userStore.userState && userStore.userState
        }
        setTrack({...track, comments: [...comments, newComment]});
        setComment('');
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const deleteComment = async (comment: IComment) => {
    try {
      const response = await axios.delete(`/tracks/comment/${comment._id}`);
      setTrack({...track, comments: comments.filter(item => item._id !== comment._id)});
      return response;
    } catch (err) {
      console.warn(err)
    }
  }

  React.useEffect(() => {
    userStore.authMe()
  })

  return (
    <Grid sx={{
      display: 'flex', 
      flexDirection: 
      'column', 
      gap: '40px' 
    }}>
      {userStore.userState 
      &&
      <Grid sx={{
        display: 'flex', 
        flexDirection: 'row', 
        gap: '15px', 
        alignItems: 'center'
      }}>
        <Avatar 
          src={`http://localhost:9000/${userStore.userState?.avatarUrl}`}
          sx={{
            width: 50, 
            height: 50, 
            bgcolor: '#5824f3'
        }}/>        
        <TextField 
        label="Оставить комментарий..."
        multiline
        fullWidth
        value={comment}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setComment(evt.target.value)}
        />
        <Button 
        variant='contained' 
        onClick={postComment}
        >
          Отправить
        </Button>
      </Grid>
      }
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
              src={`http://localhost:9000/${comment.user.avatarUrl}`}
              sx={{
                width: 40, 
                height: 40, 
                bgcolor: '#5824f3'
            }}/>
            <Typography fontSize={20}>
              {comment.user.fullName}
            </Typography>
          </Box>
          {userStore.userState?._id === comment.user._id
          &&
          <Box>
            <IconButton>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton>
              <ClearIcon 
              color="error"
              onClick={() => deleteComment(comment)} 
              />
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
          Опубликовано {dayjs(comment.createdAt).format("DD.MM.YY в HH:mm")}
        </Typography>
      </Card>
      )}
    </Grid>
  )
}

export default CommentBlock;