import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import PropTypes from "prop-types";

export const NavBar = ({
  token,
  setToken,
  //  staff,
  currentUserType,
}) => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken("");
    navigate("/login");
  };

  const renderAuthLinks = () => {
    if (token) {
      // User is logged in
      if (currentUserType === "DM") {
        console.log("Rendering DM links");
        // Dungeon Master links
        return (
          <>
            <Link to="players">Players</Link>
            <Link to="parties">Parties</Link>
            <Link to="myparties">My Parties</Link>
            <Link to="characters">Characters</Link>
            <Link to="profile">Profile</Link>
          </>
        );
      } else if (currentUserType === "Player") {
        // Player links
        return (
          <>
            <Link to="dungeonmasters">Dungeon Masters</Link>
            <Link to="parties">Parties</Link>
            <Link to="myparties">My Parties</Link>
            <Link to="characters">Characters</Link>
            <Link to="mycharacters">My Characters</Link>
            <Link to="profile">Profile</Link>
          </>
        );
      }
    } else {
      // User is not logged in
      return (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      );
    }
  };

  NavBar.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func.isRequired,
    staff: PropTypes.bool,
    currentUserType: PropTypes.string,
  };

  return (
    <nav className="bg-slate-900">
      <div className="container mx-auto h-10vh flex items-center justify-between z-50 text-white lg:py-5 px-20 py-4 flex-1">
        <div className="flex items-center flex-1">
          <Link
            to="/"
            className="text-xl font-bold hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
          >
            Dungeon Docs
          </Link>
        </div>
        <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex space-x-8 text-[18px] whitespace-nowrap">
              {renderAuthLinks()}
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    {token && (
                      <button
                        className="button is-outlined"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div>
          {click && <div>Replace with your mobile navigation content</div>}
        </div>
        <button className="block sm:hidden" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  );
};
