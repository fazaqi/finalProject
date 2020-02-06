import React from "react";
import "./App.css";
import Login from "./pages/login";
import { Switch, Route } from "react-router-dom";
import Homepage from "./pages/home";
function App() {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/login" exact component={Login} />
    </Switch>
  );
}

export default App;
