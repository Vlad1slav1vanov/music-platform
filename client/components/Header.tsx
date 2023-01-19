import React from "react";
import AppBar from '@mui/material/AppBar';
import { Avatar, Button, FilledInput, Grid, TextField, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import {trackStore} from "../store/TrackStore"
import {userStore} from "../store/UserStore";
import SearchIcon from '@mui/icons-material/Search';
import { observer } from "mobx-react";
import styled from "styled-components";

interface HeaderProps {
  searchIsAvailable?: boolean;
}

const SearchWrapper = styled.div`
  width: 500px;
  height: 35px;
  margin-left: 150px;
  position: relative;
`

const SearchInput = styled.input`
  width: 500px;
  height: 35px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  padding-left: 60px;
  font-size: 20px;
  border: #F13457 1px solid;

  &:focus {
    outline: 2px #F13457 solid;
  }
`

const Header: React.FC<HeaderProps> = ({searchIsAvailable}) => {
  const router = useRouter();
  const [query, setQuery] = React.useState<string>('');
  const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null)

  const search = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(evt.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await trackStore.searchTracks(evt.target.value);
      }, 500)
    )
  }
  return (
    <AppBar 
    position="fixed" 
    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
    <Toolbar>
      <Typography 
      variant="h5" 
      noWrap 
      component="div"
      >
        Music Platform
      </Typography>
      {searchIsAvailable &&
      <SearchWrapper>
        <SearchIcon 
        color="secondary" 
        fontSize="medium" 
        sx={{position: 'absolute', left: "20px", top: "5px"}} 
        />
        <SearchInput
        type="text"
        placeholder="Найди песню:)"
        value={query}
        onChange={search}
        />
      </SearchWrapper>
      }
      {userStore.userState
      ?
      <Grid
      marginLeft='auto' 
      sx={{display: 'flex', 
          gap: '20px', 
          alignItems: 'center'}}
      >
        <Avatar
        sx={{width: 30, height: 30}}
        src={`http://localhost:9000/${userStore.userState.avatarUrl}`} 
        />
        <Typography
        fontSize={20}
        >
          {userStore.userState.fullName}
        </Typography>
        <Button
        color="error"
        variant="contained"
        onClick={userStore.logout}
        >
          Выйти
        </Button>    
      </Grid>
      :
      <Grid 
      marginLeft='auto' 
      sx={{display: 'flex', gap: '30px'}}
      >
        <Button
        variant="outlined"
        color="inherit"
        onClick={() => router.push('/login')}
        >
          Войти
        </Button>
        <Button
        variant="contained"
        color="secondary"
        onClick={() => router.push('/register')}
        >
          Регистрация
        </Button>       
      </Grid>
      }
    </Toolbar>
  </AppBar>
  )
}

export default observer(Header);