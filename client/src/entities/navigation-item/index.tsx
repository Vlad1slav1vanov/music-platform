import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles/index.scss'

interface NavigationItemProps {
  item: {
    href: string
    text: string
    icon: React.ReactNode
  }
}

const NavigationItem: React.FC<NavigationItemProps> = ({ item }) => {
  return (
    <ListItem>
      <NavLink
      to={item.href}
      className='nav-link'
      >
        <ListItemButton>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText>
            {item.text}
          </ListItemText>
        </ListItemButton>
      </NavLink>
    </ListItem>
  )
}

export default observer(NavigationItem)
