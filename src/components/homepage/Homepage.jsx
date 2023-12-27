// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getUserById } from "../../managers/UserManager";
import PropTypes from "prop-types";

export const Homepage = ({
  setToken,
  currentUserId,
  currentUserType,
}) => {


  console.log(localStorage);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setToken("");
    navigate("/login");
  };

  Homepage.propTypes = {
    setToken: PropTypes.func.isRequired,
    currentUserId: PropTypes.string,
    currentUserType: PropTypes.string,
  };

  return (
    <>
      <div>
        <div>
          <p>Current User ID: {currentUserId}</p>
          <p>Current userType: {currentUserType}</p>
          <ul>
          <button
            className="button is-outlined hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </ul>
        </div>
      </div>
    </>
  );
};
