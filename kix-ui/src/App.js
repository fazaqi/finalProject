import React from "react";
import "./App.css";
import Login from "./pages/login";
import { Switch, Route } from "react-router-dom";
import Homepage from "./pages/home";
import Register from "./pages/register";
function App() {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
    </Switch>
  );
}

export default App;
