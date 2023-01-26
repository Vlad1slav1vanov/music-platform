import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { useRouter } from "next/router";
import React from "react";

const menuItems = [
  { text: 'Главная', href: '/', icon: <HomeIcon color="primary"/> },
  { text: 'Мой профиль', href: '/profile', icon: <AccountBoxIcon color="primary"/> },
  { text: 'Альбомы', href: '/albums', icon: <LibraryMusicIcon color="primary"/> },
  { text: 'Треки', href: '/tracks', icon: <MusicNoteIcon color="primary"/> },
  { text: 'Плейлисты', href: '/playlists', icon: <QueueMusicIcon color="primary"/> },
];

const Navigation: React.FC = () => {
  const router = useRouter();

  return (
    <List>
      {menuItems.map(({text, href, icon}, index) =>
        <ListItem
        key={index}
        onClick={() => router.push(href)}
        >
          <ListItemButton>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText>
              {text}
            </ListItemText>
          </ListItemButton>
        </ListItem>
      )}
    </List>
  )
}

export default Navigation;