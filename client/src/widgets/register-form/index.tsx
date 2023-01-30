import { Avatar, Button, TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import registerStore from './model'
import './styles/index.scss'

const RegisterForm: React.FC = () => {
  const navigate = useNavigate()
  const pictureInput = React.useRef<HTMLInputElement | null>(null)

  const pictureUploadClick = (): void => {
    pictureInput?.current?.click()
  }

  const onSubmit = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    registerStore.register()
    navigate('/')
    registerStore.refreshForm()
  }

  return (
    <div className="register">
      <Avatar
      sx={{ background: '#5824f3' }}
      src={registerStore.avatarUrl}
      className='register__avatar'/>
      <div className='avatar-buttons-wrapper'>
        <Button
        onClick={pictureUploadClick}
        >
          Загрузить фото
        </Button>
      {(registerStore.avatarFile != null) &&
      <Button
      color='error'
      onClick={registerStore.deleteAvatar}
      >
        удалить
      </Button>
      }
      </div>
      <form className="register__form">
        <input
        onChange={registerStore.changeAvatar}
        ref={pictureInput}
        accept='image/*'
        type="file"
        hidden
        />
        <TextField
        fullWidth
        label='E-mail'
        required
        type="email"
        value={registerStore.email}
        onChange={registerStore.changeEmailInput}
        />
        <TextField
        fullWidth
        label="Имя/Никнейм"
        required
        type="text"
        value={registerStore.fullName}
        onChange={registerStore.changeFullNameInput}
        />
        <TextField
        fullWidth
        label="Пароль"
        required
        type="password"
        value={registerStore.password}
        onChange={registerStore.changePasswordInput}
        />
        <div className='submit-wrapper' >
          <Button
          variant="contained"
          size="medium"
          onClick={onSubmit}
          >
            Регистрация
          </Button>
          <Button
          variant='outlined'
          onClick={registerStore.refreshForm}
          >
            Сброс
          </Button>
        </div>
      </form>
    </div>
  )
}

export default observer(RegisterForm)
