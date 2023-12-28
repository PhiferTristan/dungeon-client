import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Homepage } from "../components/homepage/Homepage";
import PropTypes from "prop-types";
import { MyProfile } from "../components/profiles/MyProfile";
import { EditProfile } from "../components/profiles/EditProfile";
import { PlayersList } from "../components/players/PlayersList";

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
    setStaff: PropTypes.func,
    currentUserId: PropTypes.string,
    currentUserType: PropTypes.string,
  };

  return (
    <>
      <div className="h-screen bg-gradient-to-b from-gray-800">
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

            <Route path="profiles">
              <Route path="mine" element={<MyProfile token={token} currentUserId={currentUserId} currentUserType={currentUserType} />} />
              <Route path="edit" element={<EditProfile token={token} currentUserId={currentUserId} />} />
            </Route>

            <Route path="players">
              <Route path="all"
              element={<PlayersList token={token} />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
};
