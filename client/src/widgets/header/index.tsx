import { AppBar, Toolbar } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import HeaderLogo from 'shared/UI/header-logo'
import './styles/styles.scss'

const Header: React.FC = () => {
  return (
    <AppBar className='header'>
      <Toolbar>
        <HeaderLogo />
      </Toolbar>
    </AppBar>
  )
}

export default observer(Header)
