import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useRouter } from "next/router";
import React from "react";

const menuItems = [
  { text: 'Главная', href: '/', icon: <HomeIcon color="primary"/> },
  { text: 'Альбомы', href: '/albums', icon: <LibraryMusicIcon color="primary"/> },
  { text: 'Треки', href: '/tracks', icon: <MusicNoteIcon color="primary"/> },
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