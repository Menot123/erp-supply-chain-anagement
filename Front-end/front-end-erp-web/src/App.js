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
import ManageAccountingRoute from './routes/ManageAccountingRoute';
import ModalProfile from './components/ProfileEmployee/ModalProfile';
import PrivateRoute from './routes/PrivateRoute'
import CustomerPrivateRoutes from './routes/CustomerPrivateRoutes'
import SaleOrderRoute from './routes/SaleOrderRoute';
import { ViewQuote } from './components/Customer/ViewQuote';
import CustomerSignIn from './components/SignIn/CustomerSignIn';
import HomeCustomer from './components/Customer/HomeCustomer';
import CustomerRoute from './routes/CustomerRoute';

function App() {

  const location = useLocation();
  const url = location.pathname;

  useEffect(() => {
    document.title = 'Ứng dụng - ERP Viet';
  }, []);

  return (
    <div className='app-container'>
      {url === '/login' || url === '/forgot-password' || url === ('/customer/login') ? ' ' : <Navigation />}
      <Switch>
        <PrivateRoute path={path.MANAGE_EMPLOYEES} component={ManageEmployeeRoute}>
        </PrivateRoute>
        <PrivateRoute path={path.SALE_ORDER} component={SaleOrderRoute}>
        </PrivateRoute>
        <PrivateRoute path={path.MANAGE_INVENTORY} component={ManageInventoryRoute}>
        </PrivateRoute>
        <PrivateRoute path={path.MANAGE_ACCOUNTING} component={ManageAccountingRoute}>
        </PrivateRoute>
        <Route path={path.SIGN_IN} exact>
          <SignIn />
        </Route>
        <Route path={path.CUSTOMER_SIGN_IN} exact>
          <CustomerSignIn />
        </Route>
        <CustomerPrivateRoutes path={path.CUSTOMER_HOME2} component={CustomerRoute}>
        </CustomerPrivateRoutes>
        <Route path={path.FORGOT_PASSWORD} exact>
          <ForgotPassword />
        </Route>
        <Route path={[path.HOME, path.HOME2]} exact>
          <Home />
        </Route>
        <PrivateRoute path={[path.VIEW_QUOTE, path.VIEW_DRAFT_INVOICE]} component={ViewQuote}>
        </PrivateRoute>
        <Route path="*" exact>
          <NotFound404 />
        </Route>

      </Switch>
      {!url.startsWith('/customer') &&
        <ModalProfile />
      }
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
