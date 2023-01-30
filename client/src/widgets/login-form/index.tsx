import { Button, TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'

const LoginForm: React.FC = () => {
  return (
    <div className='login'>
      <form className='login__form'>
        <TextField />
        <TextField />
        <div>
          <Button
          variant='contained'
          size='medium'
          >
            Вход
          </Button>
          <Button
          
          >
            Сброс
          </Button>
        </div>
      </form>
    </div>
  )
}

export default observer(LoginForm)
