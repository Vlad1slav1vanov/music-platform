import { observer } from 'mobx-react-lite'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import QueueMusicIcon from '@mui/icons-material/QueueMusic'
import { List, Toolbar } from '@mui/material'
import NavigationItem from 'entities/navigation-item'
import { useNavigate } from 'react-router-dom'
import './styles/index.scss'

const MainNavigation: React.FC = () => {
  const navItems = [
    { text: 'Главная', href: '/', icon: <HomeIcon color="primary"/> },
    { text: 'Мой профиль', href: '/profile', icon: <AccountBoxIcon color="primary"/> },
    { text: 'Альбомы', href: '/albums', icon: <LibraryMusicIcon color="primary"/> },
    { text: 'Треки', href: '/tracks', icon: <MusicNoteIcon color="primary"/> },
    { text: 'Плейлисты', href: '/playlists', icon: <QueueMusicIcon color="primary"/> }
  ]

  const navigate = useNavigate()

  return (
    <div className='main-navigation' >
      <List>
        {navItems.map((item, index) =>
          <NavigationItem
          item={item}
          key={index}
          onClick={() => { navigate(item.href) }}
          />
        )}
      </List>
      <Toolbar />
    </div>
  )
}

export default observer(MainNavigation)
