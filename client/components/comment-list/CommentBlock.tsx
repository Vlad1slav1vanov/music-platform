import { Avatar, Button, Grid, TextField } from "@mui/material";
import React from "react";
import { userStore } from "../../store/UserStore";
import { IComment } from "../../types/comment";
import axios from "../../axios";
import { ITrack } from "../../types/track";
import { observer } from "mobx-react";
import styled from "styled-components";
import { url } from "../../url/url";
import CommentList from "./CommentList";

interface CommentBlockProps {
  comments: IComment[];
  track: ITrack;
  setTrack: React.Dispatch<React.SetStateAction<ITrack>>;
}

const CommentBlockWrapper = styled(Grid)`
  display: flex; 
  flex-direction: column;
  gap: 40px;
`

const CreateCommentWrapper = styled(Grid)`
  display: flex; 
  flex-direction: row; 
  gap: 15px; 
  align-items: center;
`

const UserAvatar = styled(Avatar)`
  width: 50; 
  height: 50; 
  background-color: #5824f3;
  align-self: start;
`

const CommentBlock: React.FC<CommentBlockProps> = ({comments, track, setTrack}) => {
  const [comment, setComment] = React.useState('');
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

  const commentHandleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setComment(evt.target.value);
  }

  const deleteComment = async (comment: IComment) => {
    try {
      await axios.delete(`/tracks/comment/${comment._id}`);
      setTrack({
        ...track, 
        comments: comments.filter(item => item._id !== comment._id), 
        commentsCount: track.commentsCount + 1
      });
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
    <CommentBlockWrapper>
      {userStore.userState 
      &&
      <CreateCommentWrapper>
        <UserAvatar src={url + userStore.userState?.avatarUrl}/>        
        <TextField
        label="Оставить комментарий..."
        multiline
        fullWidth
        value={comment}
        onChange={commentHandleChange}
        />
        <Button
        sx={{alignSelf: 'end'}}
        variant='contained' 
        onClick={postComment}
        >
          Отправить
        </Button>
      </CreateCommentWrapper>
      }
      <CommentList 
      comments={comments} 
      editComment={editComment} 
      deleteComment={deleteComment} 
      editCommentText={editCommentText}
      setEditCommentText={setEditCommentText}
      />
    </CommentBlockWrapper>
  )
}

export default observer(CommentBlock);