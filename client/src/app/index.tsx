import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import AppRoutes from 'app/routes'
import './index.scss'
import theme from './theme'
import Header from 'widgets/header'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className='app'>
        <Header />
        <AppRoutes />
      </div>
    </ThemeProvider>
  )
}

export default observer(App)
