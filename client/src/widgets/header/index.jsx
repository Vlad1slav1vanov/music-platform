import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import './styles/index.scss';

const Header = () => {
  const navigate = useNavigate();
  return (
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
              onClick={() => navigate('/login')}
            >
              Войти
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/register')}
            >
              Регистрация
            </Button>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

