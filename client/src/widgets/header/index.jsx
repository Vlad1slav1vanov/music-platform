import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import './styles/index.scss'

const Header = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <div className="toolbar-wrapper">
            <Typography 
            variant="h5" 
            noWrap 
            component="div"
            >
              Music Platform
            </Typography>
            <div className="buttons-wrapper">
              <Button
              variant="outlined"
              color="inherit"
              >
                Войти
              </Button>
              <Button
              variant="contained"
              color="secondary"
              >
                Регистрация
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header;

