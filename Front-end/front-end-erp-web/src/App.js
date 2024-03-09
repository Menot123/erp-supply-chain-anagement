import './App.scss'
import Navigation from "./components/Nav/Navigation";
import SignIn from "./components/SignIn/SignIn";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const url = window.location.pathname
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
            <h4>Home</h4>
            <button className='btn btn-primary'>Button bootstrap</button>
          </Route>
          <Route path="*" exact>
            404 Not found
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
