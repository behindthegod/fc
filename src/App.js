import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import NavBar from "./app/layout/navbar";
import Main from "./app/layout/main";
import Login from "./app/layout/login";
import UsersList from "./app/components/usersList";

function App() {
  return <>
    <NavBar/>
    <Switch>
      <Route path="/users/:userId" component={UsersList}/>
      <Route path="/" exact component={Main}/>
      <Route path="/login" component={Login}/>

      <Route path="/users" component={UsersList}/>
      <Redirect to='/'/>
    </Switch>
  </>;
}

export default App;


