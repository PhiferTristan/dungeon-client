// import { useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../../managers/AuthManager";

// export const Login = ({ setToken }) => {
//   const username = useRef();
//   const password = useRef();
//   const navigate = useNavigate();
//   const [isUnsuccessful, setisUnsuccessful] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault();

//     const user = {
//       username: username.current.value,
//       password: password.current.value,
//     };

//     loginUser(user).then((res) => {
//       if ("valid" in res && res.valid) {
//         setToken(res.token);
//         localStorage.setItem("staff", res.staff);
//         navigate("/");
//         localStorage.setItem("id", res.id);
//         navigate("/");
//       } else {
//         setisUnsuccessful(true);
//       }
//     });
//   };

//   return (
//     <section className="columns is-centered">
//       <form className="column is-two-thirds" onSubmit={handleLogin}>
//         <h1 className="title">Dungeon Docs</h1>
//         <p className="subtitle">Please sign in</p>

//         <div className="field">
//           <label className="label">Username</label>
//           <div className="control">
//             <input className="input" type="text" ref={username} />
//           </div>
//         </div>

//         <div className="field">
//           <label className="label">Password</label>
//           <div className="control">
//             <input className="input" type="password" ref={password} />
//           </div>
//         </div>

//         <div className="field is-grouped">
//           <div className="control">
//             <button className="button is-link" type="submit">
//               Submit
//             </button>
//           </div>
//           <div className="control">
//             <Link to="/register" className="button is-link is-light">
//               Cancel
//             </Link>
//           </div>
//         </div>
//         {isUnsuccessful ? (
//           <p className="help is-danger">Username or password not valid</p>
//         ) : (
//           ""
//         )}
//       </form>
//     </section>
//   );
// };

import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../managers/AuthManager";

export const Login = ({ setToken }) => {
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [isUnsuccessful, setisUnsuccessful] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      username: username.current.value,
      password: password.current.value,
    };

    loginUser(user).then((res) => {
      if ("valid" in res && res.valid) {
        setToken(res.token);
        localStorage.setItem("staff", res.staff);
        navigate("/");
        localStorage.setItem("id", res.id);
        navigate("/");
      } else {
        setisUnsuccessful(true);
      }
    });
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <form className="w-full max-w-sm" onSubmit={handleLogin}>
        <h1 className="text-3xl font-bold mb-4">Dungeon Docs</h1>
        <p className="text-lg mb-4">Please sign in</p>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={username} />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" ref={password} />
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
          </button>
          <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Register
          </Link>
        </div>

        {isUnsuccessful ? (
          <p className="mt-4 text-red-500">Username or password not valid</p>
        ) : (
          ""
        )}
      </form>
    </section>
  );
};