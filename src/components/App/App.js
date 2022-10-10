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
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { currentUserContext } from '../../contexts/currentUserContext';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {

  const [currentUser, setCurrentUser] = useState({});

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

  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);

  const [infoToolTipInformation, setInfoToolTipInformation] = useState({});

  const handleInfoToolTip = (message, isGood) => {
    setInfoToolTipInformation({ message, isGood });
    setInfoToolTipOpen(true);
  }

  const handleCloseInfoToolTip = () => {
    setInfoToolTipOpen(false);
    setInfoToolTipInformation({});
  }

  return (
    <currentUserContext.Provider value={currentUser}>
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
          <ProtectedRoute path="/profile">
            <Header
              onMenuButton={handleOpenMobileMenu}
            />
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path="/movies">
            <Header
              onMenuButton={handleOpenMobileMenu}
            />
            <Movies />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies">
            <Header
              onMenuButton={handleOpenMobileMenu}
            />
            <SavedMovies />
            <Footer />
          </ProtectedRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <NavigationMobile
          isOpen={isOpenMobileMenu}
          onClose={handleCloseMobileMenu}
        />
        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          onClose={handleCloseInfoToolTip}
          info={infoToolTipInformation}
        />
      </div>
    </currentUserContext.Provider>
  )
}
export default App;
