import Navbar from '../components/navbar';
import styles from '../styles/css/layout.module.css';
import DrawerAppBar from './appbar';
import 'material-symbols';
import { routes } from '../lib/router';
import * as React from 'react';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { intItem } from '../types/router.interface';

const drawerWidth = 240;
const navItems = [
  '/',
  'planets',
  'blog',
  'showLinks',
  'post',
  'posts',
  'posts/preview',
  'api/getLinks',
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: 'center' }}
    >
      <Typography
        variant='h6'
        sx={{ my: 2 }}
      >
        MUI
      </Typography>
      <Divider />
      <List>
        {routes.map((item) => (
          <Link
            key={item.slug}
            href={item.slug}
          >
            <ListItemButton sx={{ textAlign: 'center' }}>
              {item.name}
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <>
        <AppBar component='nav'>
          <Toolbar className={styles.header}>
            <IconButton
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              className={styles.menu}
            >
              <span className='material-symbols-outlined'>
                density_medium
              </span>
            </IconButton>
            <Box className={styles.navbar}>
              {routes.map((item) => (
                <Link
                  key={item.name}
                  href={item.slug}
                >
                  <span className='material-symbols-outlined'>
                    {item.icon}
                  </span>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component='nav'>
          <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </>
      <Toolbar />
      <Toolbar />
    </>
  );
}
