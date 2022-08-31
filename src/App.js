import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import NavBar from "./app/components/ui/navbar";
import Main from "./app/layout/main";
import Login from "./app/layout/login";
import Users from "./app/layout/users";

function App() {
  return (
      <div>
        <NavBar />
        <Switch>
          <Route path="/users/:userId?" component={Users} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default App;


