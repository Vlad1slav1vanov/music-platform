import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface NavigationItemProps {
  item: {
    href: string
    text: string
    icon: React.ReactNode
  }
  onClick: () => void
}

const NavigationItem: React.FC<NavigationItemProps> = ({ item, onClick }) => {
  return (
    <ListItem
    onClick={onClick}
    >
      <ListItemButton>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText>
          {item.text}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

export default observer(NavigationItem)
