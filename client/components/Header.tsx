import React from "react";
import AppBar from '@mui/material/AppBar';
import { Button, Grid, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";


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
      <Grid 
      marginLeft='auto' 
      sx={{display: 'flex', gap: '30px'}}
      >
        <Button
        variant="contained"
        color="secondary"
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
    </Toolbar>
  </AppBar>
  )
}

export default Header;