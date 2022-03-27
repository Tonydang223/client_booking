import React, { useContext } from "react";
import { Navigate, Outlet, Route, useLocation } from "react-router-dom";
import { AppContext } from "../redux/context";
import useAuth from "./useAuth";
import { getAllLocalStorage } from "./../utils/func";

const ProtectedRoute = ({ allRoute, component: Component }) => {
  const valueLocal = getAllLocalStorage();
  const location = useLocation();
  const checkRole = allRoute?.includes(valueLocal?.isRole);
  if (!valueLocal?.refToken && !valueLocal?.accessToken)
    return <Navigate to={"/signIn"} />;
  return checkRole ? (
    <Outlet />
  ) : (
    valueLocal?.accessToken && <Navigate to={"/unauthorized"} />
  );

  // (
  //   <Route
  //      {...rest}
  //      path={path}
  //      element={()=>{
  //        checkRole?(<Component/>):user?(<Navigate to={'/unauthorized'}/>):(<Navigate to={'/signIn'}/>)
  //      }}
  //   />
  // )
};

export default ProtectedRoute;
