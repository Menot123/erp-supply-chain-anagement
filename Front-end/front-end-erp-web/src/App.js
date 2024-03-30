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
import { path } from './utils/constant'
import ManageEmployeeRoute from './routes/ManageEmployeeRoute';
import ModalProfile from './components/ProfileEmployee/ModalProfile';

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
        <Route path={path.MANAGE_EMPLOYEES} component={ManageEmployeeRoute}>
        </Route>
        <Route path={path.SIGN_IN} exact>
          <SignIn />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <Route path={[path.HOME, path.HOME2]} exact>
          <Home />
        </Route>
        <Route path={path.PROFILE} component={ModalProfile}>
        </Route>
        <Route path="*" exact>
          <NotFound404 />
        </Route>

      </Switch>
      <ModalProfile />
      <ToastContainer
        position="bottom-right"
        style={{ minWidth: "fit-content" }}
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
