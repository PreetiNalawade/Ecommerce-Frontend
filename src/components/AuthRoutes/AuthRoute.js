import React from "react";
import Login from "../Users/Forms/Login";

export const AuthRoute = ({ children }) => {
  // get user from local storage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isLoggedIn = user?.token ? true : false;
  if (!isLoggedIn) return <Login />;
  return <>{children}</>;
};
