import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import './styles/index.scss'

const HeaderUnidentifiedUser: React.FC = () => {
  return (
    <div className='buttons-wrapper'>
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
  )
}

export default observer(HeaderUnidentifiedUser)
