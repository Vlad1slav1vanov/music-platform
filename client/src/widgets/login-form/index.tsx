import { Button, TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import userStore from 'shared/user-store'
import loginStore from './model'
import './styles/index.scss'

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const onSubmit = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loginStore.login()
    loginStore.refreshForm()
  }

  const pressEnter = (evt: React.KeyboardEvent): void => {
    if (evt.key === 'Enter') {
      onSubmit()
    }
  }

  if (userStore.user != null) {
    navigate('/')
  }

  return (
    <div className='login' onKeyDown={pressEnter}>
      <form className='login__form'>
        <TextField
        fullWidth
        label='Email'
        type='email'
        value={loginStore.email}
        onChange={loginStore.changeEmail}
        />
        <TextField
        fullWidth
        label='Пароль'
        type='password'
        value={loginStore.password}
        onChange={loginStore.changePassword}
        />
        <div className='buttons-wrapper'>
          <Button
          variant='contained'
          size='medium'
          onClick={onSubmit}
          >
            Вход
          </Button>
          <Button
          variant='outlined'
          size='medium'
          onClick={loginStore.refreshForm}
          >
            Сброс
          </Button>
        </div>
      </form>
    </div>
  )
}

export default observer(LoginForm)
