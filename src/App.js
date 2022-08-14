import React from "react";
import {Route, Switch} from "react-router-dom";
import NavBar from "./app/layout/navbar";
import Main from "./app/layout/main";
import Login from "./app/layout/login";
import Users from "./app/components/users";

function App() {
  return <>
    <NavBar/>
    <Switch>
      <Route path="/" exact component={Main}/>
      <Route path="/login" component={Login}/>
      <Route path="/users" component={Users}/>
    </Switch>
  </>;
}

export default App;


