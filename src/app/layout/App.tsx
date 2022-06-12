import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutPage from '../../features/about/AboutPage';
import BasketPage from '../../features/basket/BasketPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import NotFound from '../errors/NotFound';
import ServerError from '../errors/ServerError';
import Header from './Header';
import './styles.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType
    }
  })

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>  
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />  
      <Container>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/catalog' component={Catalog} />
          <Route path='/catalog/:id' component={ProductDetails} />
          <Route path='/about' component={AboutPage} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/server-error' component={ServerError} />
          <Route path='/basket' component={BasketPage} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
