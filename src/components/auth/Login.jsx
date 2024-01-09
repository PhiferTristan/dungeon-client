import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../managers/AuthManager";
import PropTypes from "prop-types";

export const Login = ({ setToken }) => {
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [isUnsuccessful, setIsUnsuccessful] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      username: username.current.value,
      password: password.current.value,
    };

    loginUser(user).then((res) => {
      console.log(res)
      if ("valid" in res && res.valid) {
        setToken(res.token);
        localStorage.setItem("staff", res.staff);
        localStorage.setItem("userType", res.user_type);
        localStorage.setItem("id", res.id);

        // Check and set playerId if user's user_type is "Player"
        if (res.user_type === "Player" && "player_user" in res) {
          localStorage.setItem("playerId", res.player_user.id);
        }

        // Check and set dungeonMasterId if user's user_type is "DM"
        if (res.user_type === "DM" && "dungeon_master_user" in res) {
          localStorage.setItem("dungeonMasterId", res.dungeon_master_user.id);
        }

        navigate("/");
      } else {
        setIsUnsuccessful(true);
      }
    });

    Login.propTypes = {
      setToken: PropTypes.func.isRequired,
    };
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <form className="w-full max-w-md bg-white pt-5 pl-7 pr-7 pb-3 shadow-md rounded-md" onSubmit={handleLogin}>
        <h1 className="text-3xl font-bold mb-4 text-center justify-center">Welcome to Dungeon Docs</h1>
        <p className="text-lg mb-4 text-center">Please sign in</p>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            ref={username}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            ref={password}
          />
        </div>

        <div className="flex items-center flex-col">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            type="submit"
          >
            Submit
          </button>
          <Link
            to="/register"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Do you not have an account? Click here to register!
          </Link>
        </div>

        {isUnsuccessful ? (
          <p className="mt-4 text-red-500 text-center">
            Username or password not valid
          </p>
        ) : (
          ""
        )}
      </form>
    </section>
  );
};
