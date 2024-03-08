import './App.scss'
import Navigation from "./components/Nav/Navigation";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className='app-container'>
        <Navigation />
        <Switch>
          <Route path="/news">
            <h4>News</h4>
          </Route>
          <Route path="/about">
            <h4>About</h4>
          </Route>
          <Route path="/" exact>
            <h4>Home</h4>
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
