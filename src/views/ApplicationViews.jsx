import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { PlayerHome } from "../components/homepage/PlayerHome";

export const ApplicationViews = ({
  token,
  setToken,
  staff,
  setStaff,
  currentUserId,
}) => {
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
          <Route path="/" element={<PlayerHome setToken={setToken} currentUserId={currentUserId} />} />
        </Route>
      </Routes>
    </>
  );
};
