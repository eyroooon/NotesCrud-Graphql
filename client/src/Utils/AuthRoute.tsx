import React from "react";
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../Context/auth";

const AuthRoute = ({ component: Component, ...rest }: any) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
