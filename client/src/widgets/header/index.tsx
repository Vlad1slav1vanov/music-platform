import { AppBar, Toolbar, Typography } from '@mui/material'
import HeaderLogout from 'features/header-loguout'
import HeaderUnidentifiedUser from 'features/header-unidentified-user'
import { observer } from 'mobx-react-lite'
import React from 'react'
import userStore from 'shared/user-store'
import './styles/styles.scss'

const Header: React.FC = () => {
  return (
    <AppBar className='header'>
      <Toolbar className='toolbar'>
        <Typography variant="h5">
          Music Platform
        </Typography>
        {(userStore.user != null)
          ? <HeaderLogout />
          : <HeaderUnidentifiedUser />
        }
      </Toolbar>
    </AppBar>
  )
}

export default observer(Header)
