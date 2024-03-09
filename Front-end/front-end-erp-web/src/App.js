import './App.scss'
import Navigation from "./components/Nav/Navigation";
import SignIn from "./components/SignIn/SignIn";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { useEffect } from 'react'
import Home from './components/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  useEffect(() => {
    document.title = 'Ứng dụng - ERP Viet';
  }, []);

  let url = ' '

  return (
    <BrowserRouter>
      <div className='app-container'>
        {url === '/sign-in' || url === '/forgot-password' ? ' ' : <Navigation />}
        <Switch>
          <Route path="/news">
            <h4>News</h4>
          </Route>
          <Route path="/about">
            <h4>About</h4>
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="*" exact>
            404 Not found
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
    </BrowserRouter>

  )
}

export default App;
