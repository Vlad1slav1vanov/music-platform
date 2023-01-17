import React from "react";
import AppBar from '@mui/material/AppBar';
import { Avatar, Button, Grid, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import UserStore from "../store/UserStore";
import { Box } from "@mui/system";
import { observer } from "mobx-react";


const Header: React.FC = () => {
  const router = useRouter();
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      <Typography 
      variant="h4" 
      noWrap 
      component="div"
      >
        Music Platform
      </Typography>
      {UserStore.userState
      ?
      <Grid
      marginLeft='auto' 
      sx={{display: 'flex', 
          gap: '20px', 
          alignItems: 'center'}}
      >
        <Avatar 
        src={UserStore.userState.avatarUrl} 
        />
        <Typography 
        fontSize={20}
        >
          {UserStore.userState.fullName}
        </Typography>
        <Button
        color="error"
        variant="contained"
        onClick={UserStore.logout}
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