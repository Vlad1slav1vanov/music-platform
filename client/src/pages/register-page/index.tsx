import { observer } from 'mobx-react-lite'
import React from 'react'
import MainTitle from 'shared/UI/MainTitle'
import RegisterForm from 'widgets/register-form'
import './styles/index.scss'

const RegisterPage: React.FC = () => {
  return (
    <div className='register-page'>
      <MainTitle>Регистрация</MainTitle>
      <RegisterForm />
    </div>
  )
}

export default observer(RegisterPage)
