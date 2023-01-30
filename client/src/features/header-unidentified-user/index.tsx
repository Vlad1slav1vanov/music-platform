import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/index.scss'

const HeaderUnidentifiedUser: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className='buttons-wrapper'>
      <Button
      variant="outlined"
      color="inherit"
      onClick={() => { navigate('/login') }}
      >
        Войти
      </Button>
      <Button
      variant="contained"
      color="secondary"
      onClick={() => { navigate('/register') }}
      >
        Регистрация
      </Button>
  </div>
  )
}

export default observer(HeaderUnidentifiedUser)
