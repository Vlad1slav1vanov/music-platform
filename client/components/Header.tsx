import React from "react";
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography } from "@mui/material";


const Header: React.FC = () => {
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
    </Toolbar>
  </AppBar>
  )
}

export default Header;