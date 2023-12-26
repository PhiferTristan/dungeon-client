import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Homepage } from "../components/homepage/Homepage";
import PropTypes from "prop-types";

export const ApplicationViews = ({
  token,
  setToken,
  // staff,
  setStaff,
  currentUserId,
  currentUserType,
}) => {
  ApplicationViews.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func.isRequired,
    staff: PropTypes.bool,
    setStaff: PropTypes.func.isRequired,
    currentUserId: PropTypes.string,
    currentUserType: PropTypes.string,
  };

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Login setToken={setToken} setStaff={setStaff} />}
        />
        <Route
          path="/register"
          element={<Register setToken={setToken} setStaff={setStaff} />}
        />
        <Route element={<Authorized token={token} />}>
          <Route
            path="/"
            element={
              <Homepage
                setToken={setToken}
                currentUserId={currentUserId}
                currentUserType={currentUserType}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
};
