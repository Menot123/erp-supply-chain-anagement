import './App.scss'
import Navigation from "./components/Nav/Navigation";
import SignIn from "./components/SignIn/SignIn";
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
        <Route path={[path.HOME, path.HOME2]} exact>
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
