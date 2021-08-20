import jwtDecode from "jwt-decode";
import React, { createContext, useReducer } from "react";

const initialState = { user: null };

if (localStorage.getItem("jwtToken")) {
  const decodedToken: any = jwtDecode(
    localStorage.getItem("jwtToken") as string
  );
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

type AuthContextType = {
  user: any;
  login: any;
  logout: any;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: (data: any) => {},
  logout: () => {},
});

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
  }
};

const AuthProvider = (props: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: any) => {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "SIGNIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
