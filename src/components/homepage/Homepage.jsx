// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUserById } from "../../managers/UserManager";
import PropTypes from "prop-types";

export const Homepage = ({
  // token,
  currentUserId,
  currentUserType,
}) => {
  console.log(localStorage);
  // const navigate = useNavigate();

  Homepage.propTypes = {
    token: PropTypes.string,
    currentUserId: PropTypes.string,
    currentUserType: PropTypes.string,
  };

  return (
    <>
      <div>
        <div>
          <p>Current User ID: {currentUserId}</p>
          <p>Current userType: {currentUserType}</p>
        </div>
      </div>
    </>
  );
};
