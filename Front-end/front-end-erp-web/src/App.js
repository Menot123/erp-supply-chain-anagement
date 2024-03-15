import './App.scss'
import Navigation from "./components/Nav/Navigation";
import SignIn from "./components/SignIn/SignIn";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import NotFound404 from "./components/404_Not_Found/NotFound404";
import {
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import { useEffect } from 'react'
import Home from './components/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const location = useLocation();
  const url = location.pathname;


  useEffect(() => {
    document.title = 'Ứng dụng - ERP Viet';
  }, []);

  return (
    <div className='app-container'>
      {url === '/login' || url === '/forgot-password' ? ' ' : <Navigation />}
      <Switch>
        <Route path="/news">
          <h4>News</h4>
        </Route>
        <Route path="/about">
          <h4>About</h4>
        </Route>
        <Route path="/login" exact>
          <SignIn />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <Route path={['/', '/home']} exact>
          <Home />
        </Route>
        <Route path="*" exact>
          <NotFound404 />
        </Route>
      </Switch>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>

  )
}

export default App;
