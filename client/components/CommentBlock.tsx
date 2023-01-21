import { Avatar, Box, Button, Card, Grid, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import { userStore } from "../store/UserStore";
import { IComment } from "../types/comment";
import dayjs from "dayjs";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import axios from "../axios";
import { ITrack } from "../types/track";
import { observer } from "mobx-react";
import { start } from "repl";

interface CommentBlockProps {
  comments: IComment[];
  track: ITrack;
  setTrack: React.Dispatch<React.SetStateAction<ITrack>>;
}

const CommentBlock: React.FC<CommentBlockProps> = ({comments, track, setTrack}) => {
  const [comment, setComment] = React.useState('');
  const [editingComment, setEditingComment] = React.useState<IComment | null>(null);
  const [editCommentText, setEditCommentText] = React.useState('');

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
        setTrack({
          ...track, 
          comments: [...comments, newComment], 
          commentsCount: track.commentsCount + 1
        });
        setComment('');
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const deleteComment = async (comment: IComment) => {
    try {
      const response = await axios.delete(`/tracks/comment/${comment._id}`);
      setTrack({
        ...track, 
        comments: comments.filter(item => item._id !== comment._id), 
        commentsCount: track.commentsCount + 1
      });
      return response;
    } catch (err) {
      console.warn(err)
    }
  }

  const editComment = async (comment: IComment) => {
    try {
      const request = {
        text: editCommentText,
      }
      await axios.patch(`/tracks/comment/${comment._id}`, request);
      const commentIndex = comments.findIndex((item) => item._id === comment._id);
        const updatedComment = {
            ...comments[commentIndex],
            text: editCommentText
        };
        const newComments = [
            ...comments.slice(0, commentIndex),
            updatedComment,
            ...comments.slice(commentIndex + 1)
        ];
        setTrack({ ...track, comments: newComments });
    } catch (err) {
      console.log(err)
    }
  }

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
            bgcolor: '#5824f3',
            alignSelf: 'start',
        }}/>        
        <TextField 
        label="Оставить комментарий..."
        multiline
        fullWidth
        value={comment}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setComment(evt.target.value)}
        />
        <Button
        sx={{alignSelf: 'end'}}
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
            <IconButton onClick={() => {
            setEditCommentText(comment.text)
            setEditingComment(comment)
            }}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => deleteComment(comment)} >
              <ClearIcon color="error" />
            </IconButton>
          </Box>
          }
        </Box>
        {editingComment === comment 
        ?
        <Grid 
        sx={{
          display: 'flex', 
          flexDirection: 'column', 
          gap: '15px'
        }}>
          <TextField 
          label="Редактировать комментарий"
          value={editCommentText}
          onChange={(evt) => setEditCommentText(evt.target.value)}
          />
          <Button
          onClick={() => editComment(comment)}
          >
            Сохранить
          </Button>
          <Button
          onClick={() => setEditingComment(null)}
          >
            Сброс
          </Button>
        </Grid>
        :
        <Typography
        fontSize={18} 
        whiteSpace='pre'
        >
          {comment.text}
        </Typography>        
        }
        <Typography color="grey" >
          Опубликовано {dayjs(comment.createdAt).format("DD.MM.YY в HH:mm")}
        </Typography>
      </Card>
      )}
    </Grid>
  )
}

export default observer(CommentBlock);