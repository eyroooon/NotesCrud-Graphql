import React from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./SignUp";
import NotesTable from "../Components/NotesTable";
import SignIn from "./SignIn";
import AuthRoute from "../Utils/AuthRoute";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={NotesTable}></Route>
      <AuthRoute exact path="/signup" component={SignUp}></AuthRoute>
      <AuthRoute exact path="/signin" component={SignIn}></AuthRoute>
    </Switch>
  );
};

export default Main;
