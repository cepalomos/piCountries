import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Landing from './Pages/Landing';
import Home from './Pages/Home'
import Detail from './Pages/Detail';
import Form from './Pages/Form';
import Error from './Pages/Error';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={"/"}>
            <Landing />
          </Route>
          <Route exact path={"/home"}>
            <Home />
          </Route>
          <Route exact path={"/home/:id"}>
            <Detail />
          </Route>
          <Route exact path={"/create"}>
            <Form />
          </Route>
          <Route path={"*"}>
            <Error/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
