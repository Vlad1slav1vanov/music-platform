import { Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'

const HomePage: React.FC = () => {
  return (
    <>
      <Typography variant='h4'>Популярное</Typography>
      <Typography variant='h4'>Новинки</Typography>
    </>
  )
}

export default observer(HomePage)
