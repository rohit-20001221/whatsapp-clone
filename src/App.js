import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  // Redirect, // <-- remove comment in production
  Route,
  Switch,
} from "react-router-dom";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";
import { useStateValue } from "./StateProvider";

function App() {
  // eslint-disable-next-line
  const [{ user, token }, dispatch] = useStateValue();

  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <div className="app">
            <Sidebar />
            <Chat />
          </div>
        </Route>
        {/* <Route
          render={() => {
            if (user !== null) {
              return (
                <div className="app">
                  <Sidebar />
                  <Chat />
                </div>
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
          path="/"
        ></Route> */}
      </Switch>
    </Router>
  );
}

export default App;
