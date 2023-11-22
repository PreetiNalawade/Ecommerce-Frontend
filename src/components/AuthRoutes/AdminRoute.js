import React from "react";
import Login from "../Users/Forms/Login";

export const AdminRoutes = ({ children }) => {
  // get user from local storage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user?.userFound?.isAdmin ? true : false;
  if (!isAdmin) return <h1>Access Denied, Admin only</h1>;
  return <>{children}</>;
};
