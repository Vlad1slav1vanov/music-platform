import React, { useEffect } from 'react'
import { ThemeProvider } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import AppRoutes from 'app/routes'
import './styles/index.scss'
import theme from './theme'
import { BrowserRouter } from 'react-router-dom'
import Header from 'widgets/header'
import MainNavigation from 'widgets/main-navigation'
import userStore from 'shared/user-store'

const App: React.FC = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    userStore.checkAuth()
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <MainNavigation />
        <main className='main-wrapper'>
          <AppRoutes />
        </main>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default observer(App)
