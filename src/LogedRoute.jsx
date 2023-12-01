import React from "react";
import { Navigate } from "react-router-dom";

function LogedRoute({ authenticated, component }) {
  return authenticated == null ? <Navigate to="/login"></Navigate> : component;
}

export default LogedRoute;
