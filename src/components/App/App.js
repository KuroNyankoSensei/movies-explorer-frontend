import './App.css';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
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
import mainApi from '../../utils/MainApi';

function App() {

  const history = useHistory();

  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

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

  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    handleTokenCheck();
  }, [])

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => {
          handleInfoToolTip(`Ошибка ${err.message}`, false);
          handleSignOut();
        })
    }
  }

  function handleRegister({ name, email, password }) {
    mainApi.register(name, email, password)
      .then((res) => {
        setCurrentUser(res);
        handleLogin({ email, password })
      })
      .catch((err) => {
        handleInfoToolTip(`Ошибка ${err.message}`, false);
      })
  }

  function handleLogin({ email, password }) {
    mainApi.auth(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        handleTokenCheck(res.token);
        history.push('/movies');
      })
      .catch((err) => {
        handleInfoToolTip(`Ошибка ${err.message}`, false);
      })
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.clear();
    history.push('/');
  }

  function handleProfileUpdate({ name, email }) {
    mainApi.profileUpdate(name, email)
      .then((res) => {
        setCurrentUser(res);
        handleInfoToolTip('Профиль успешно обновлен', true)
      })
      .catch((err) => {
        handleInfoToolTip(`Ошибка ${err.message}`, false);
      })
  }

  function getSavedMovies() {
    mainApi.getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        localStorage.setItem('savedMovies', JSON.stringify(res));
      })
      .catch((err) => {
      })
  }

  function handleSaveMovie(movie) {
    const Reg = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/;

    if (!Reg.test(movie.trailerLink)) {
      movie.trailerLink = 'https://youtube.com/'
    }

    mainApi.saveMovie(movie)
      .then((savedMovie) => {
        savedMovies.push(savedMovie);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch((err) => {
        handleInfoToolTip(`Ошибка ${err.message}`, false);
      })
  }

  function handleDeleteMovie(id) {
    mainApi.deleteMovie(id)
      .then(setSavedMovies((state) => { state.filter((movie) => movie._id !== id) })
      )
      .catch((err) => {
        handleInfoToolTip(`Ошибка ${err.message}`, false);
      })
  }

  useEffect(() => {
    if (loggedIn) {
      getSavedMovies();
    }
  }, [loggedIn])

  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser])

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header
              page="main"
              loggedIn={loggedIn}
              onBurger={handleOpenMobileMenu}
            />
            <Main />
            <Footer />
          </Route>
          <Route path="/signup">
            {() => (!loggedIn
              ? <Register
                onSubmit={handleRegister}
              />
              : <Redirect to="/" />)}
          </Route>
          <Route path='/signin'>
            {() => (!loggedIn
              ? <Login
                onSubmit={handleLogin}
              />
              : <Redirect to="/"
              />)}
          </Route>
          <ProtectedRoute path="/profile">
            <Header
              onMenuButton={handleOpenMobileMenu}
              loggedIn={loggedIn}
            />
            <Profile
              onSignOut={handleSignOut}
              onSubmit={handleProfileUpdate}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/movies">
            <Header
              page="movies"
              onMenuButton={handleOpenMobileMenu}
              loggedIn={loggedIn}
            />
            <Movies
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              handleInfoToolTip={handleInfoToolTip}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies">
            <Header
              onMenuButton={handleOpenMobileMenu}
              loggedIn={loggedIn}
            />
            <SavedMovies
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              savedMovies={savedMovies}
            />
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
