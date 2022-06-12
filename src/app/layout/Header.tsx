import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, NavLink } from "react-router-dom";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const appLinks = [
  { title: 'Catalog', path: '/catalog' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' } 
]

const authLinks = [
  { title: 'Login', path: '/login' },
  { title: 'Register', path: '/register' }
]

export default function Header({darkMode, handleThemeChange}: Props) {
  return (
    <AppBar position="static" sx={{mb: 4}}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        <Box display='flex' alignItems='center'>
          <Typography variant='h6' component={NavLink} to='/' sx={{color: 'inherit', textDecoration: 'none', fontFamily: 'Grandstander'}}>
            Web Store
          </Typography>

          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>
        

        <List sx={{display: 'flex'}}>
          {appLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={{
                color: 'inherit',
                typography: 'h6',
                fontFamily: 'Grandstander',
                '&:hover': {
                  color: 'secondary.main'
                },
                '&.active': {
                  color: 'text.secondary'
                }
              }}
            >
              {title}
            </ListItem>
          ))}
        </List>

        <Box display='flex' alignItems='center'>
          <IconButton component={Link} to='/basket' size='large' sx={{color: 'inherit'}}>
            <Badge badgeContent={4} color='secondary'>
              <ShoppingCart />
            </Badge>
          </IconButton>
              
          <List sx={{display: 'flex'}}>
            {authLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={{color: 'inherit', typography: 'h6', fontFamily: 'Grandstander'}}
              >
                {title}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  )
}