import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Header from './Header';
import Navigation from './Navigation';

interface ClippedDrawerProps {
  children: React.ReactNode;
  searchIsAvailable?: boolean;
}

const drawerWidth = 240;

const ClippedDrawer: React.FC<ClippedDrawerProps> = ({children, searchIsAvailable}) => {
  return (
    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <Header searchIsAvailable={searchIsAvailable} />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <Navigation />
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" 
      sx={{ 
        flexGrow: 1, 
        p: 3, 
        marginTop: '60px',
        marginBottom: '90px'
      }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default ClippedDrawer;