import { 
  Avatar, 
  Button, 
  Card, 
  Grid, 
  IconButton, 
  TextField, 
  Typography, 
  Box 
} from "@mui/material";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React from "react";
import { userStore } from "../../store/UserStore";
import { IComment } from "../../types/comment";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import styled from "styled-components";
import { url } from "../../url/url";

// Component interface

interface CommentListProps {
  comments: IComment[];
  editComment: (comment: IComment) => void;
  deleteComment: (comment: IComment) => void;
  editCommentText: string;
  setEditCommentText: (text: string) => void;
}

// Styles

const CommentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid grey; 
  padding: 15px;
`

const CommentHeader = styled(Box)`
  display: flex;
  justify-content: space-between; 
  gap: 20px; 
  align-items: center;
`

const UserWrapper = styled(Box)`
  display: flex;
  gap: 20px;
`

const UserAvatar = styled(Avatar)`
  width: 40;
  height: 40;
  background-color: #5824f3;
`

const EditCommentWrapper = styled(Grid)`
  display: flex; 
  flex-direction: column; 
  gap: 15px;
`

const ListWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

// Component

const CommentList: React.FC<CommentListProps> = ({
  comments, 
  editComment, 
  deleteComment, 
  setEditCommentText, 
  editCommentText
}) => {

  const [editingComment, setEditingComment] = React.useState<IComment | null>(null);

  const editHandleClick = (comment: IComment) => {
    setEditCommentText(comment.text)
    setEditingComment(comment)
  }

  const changeCommentText = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEditCommentText(evt.target.value)
  }

  return (
    <ListWrapper>
      {comments.map((comment) => 
      <CommentCard key={comment._id}>
        <CommentHeader>
          <UserWrapper>
            <UserAvatar src={url + comment.user.avatarUrl}/>
            <Typography fontSize={20}>
              {comment.user.fullName}
            </Typography>
          </UserWrapper>
          {userStore.userState?._id === comment.user._id &&
          <Box>
            <IconButton onClick={() => editHandleClick(comment)}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => deleteComment(comment)} >
              <ClearIcon color="error" />
            </IconButton>
          </Box>}
        </CommentHeader>
        {editingComment === comment 
        ? <EditCommentWrapper>
            <TextField 
            label="Редактировать комментарий"
            value={editCommentText}
            onChange={changeCommentText}
            />
            <Button onClick={() => editComment(comment)}>
              Сохранить
            </Button>
            <Button onClick={() => setEditingComment(null)}>
              Сброс
            </Button>
          </EditCommentWrapper>
        : <Typography
          fontSize={18} 
          whiteSpace='pre'
          >
            {comment.text}
          </Typography>}
        <Typography color="grey">
          Опубликован {dayjs(comment.createdAt).format("DD.MM.YY в HH:mm")}
        </Typography>
      </CommentCard>
      )}    
    </ListWrapper>
  )
}

export default observer(CommentList);