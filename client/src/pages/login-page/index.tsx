import { observer } from 'mobx-react-lite'
import React from 'react'
import MainTitle from 'shared/UI/MainTitle'
import LoginForm from 'widgets/login-form'
import './styles/index.scss'

const LoginPage: React.FC = () => {
  return (
    <div className='login-page'>
      <MainTitle>Вход</MainTitle>
      <LoginForm />
    </div>
  )
}

export default observer(LoginPage)
