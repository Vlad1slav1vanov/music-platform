import { Avatar, Button, Typography } from '@mui/material'
import React from 'react'
import { url } from 'shared/consts/url'
import userStore from 'shared/user-store'
import './styles/index.scss'

const HeaderLogout: React.FC = () => {
  const avatarUrl = userStore.user?.avatarUrl != null
    ? `${url}${userStore.user.avatarUrl}`
    : ''

  return (
    <div className='header-logout'>
      <Avatar src={avatarUrl}/>
      <Typography className='user-name'>
        {userStore.user?.fullName}
      </Typography>
      <Button
      color="error"
      variant="contained"
      onClick={userStore.logout}
      >
        Выйти
      </Button>
    </div>
  )
}

export default HeaderLogout
