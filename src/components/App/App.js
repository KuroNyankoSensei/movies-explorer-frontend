import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import { useState, useEffect } from 'react';
import NavigationMobile from '../NavigationMobile/NavigationMobile';

function App() {

  const [isOpenMobileMenu, setOpenMobileMenu] = useState(false);

  const handleOpenMobileMenu = () => {
    setOpenMobileMenu(true);
  }

  const handleCloseMobileMenu = () => {
    setOpenMobileMenu(false);
  }

  const handleCloseByEsc = (evt) => {
    if (evt.key === 'Escape') {
      handleCloseMobileMenu();
    }
  }

  useEffect(() => {
    if (isOpenMobileMenu) {
      document.addEventListener('keydown', handleCloseByEsc)
    }
    return () => document.removeEventListener('keydown', handleCloseByEsc)
  });

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Header
            page="main"
          />
          <Main />
          <Footer />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path="/profile">
          <Header
            onMenuButton={handleOpenMobileMenu}
          />
          <Profile />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <NavigationMobile
        isOpen={isOpenMobileMenu}
        onClose={handleCloseMobileMenu}
      />
    </div>
  )
}
export default App;
