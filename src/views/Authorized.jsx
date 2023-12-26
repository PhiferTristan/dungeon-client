import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export const Authorized = ({ token }) => {
  if (token) {
    return <Outlet />;
  }

  Authorized.propTypes = {
    token: PropTypes.string,
  };

  return <Navigate to="/login" replace />;
};
