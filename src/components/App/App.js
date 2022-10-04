import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
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
          <Header />
          <Profile />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  )
}
export default App;
