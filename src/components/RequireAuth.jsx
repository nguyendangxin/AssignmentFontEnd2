import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));
  if (!adminUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RequireAuth;
