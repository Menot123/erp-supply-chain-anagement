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
import ManageInventoryRoute from './routes/ManageInventoryRoute';
import ModalProfile from './components/ProfileEmployee/ModalProfile';
import PrivateRoute from './routes/PrivateRoute'
import SaleOrderRoute from './routes/SaleOrderRoute';

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
        <PrivateRoute path={path.MANAGE_EMPLOYEES} component={ManageEmployeeRoute}>
        </PrivateRoute>
        <PrivateRoute path={path.SALE_ORDER} component={SaleOrderRoute}>
        </PrivateRoute>
        <PrivateRoute path={path.MANAGE_INVENTORY} component={ManageInventoryRoute}>
        </PrivateRoute>
        <Route path={path.SIGN_IN} exact>
          <SignIn />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <Route path={[path.HOME, path.HOME2]} exact>
          <Home />
        </Route>
        <PrivateRoute path={path.PROFILE} component={ModalProfile}>
        </PrivateRoute>
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
