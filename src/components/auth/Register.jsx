// import { useRef } from "react"
// import { Link } from "react-router-dom"
// import { useNavigate } from "react-router-dom"
// import { registerUser } from "../../managers/AuthManager"

// export const Register = ({setToken}) => {
//   const firstName = useRef()
//   const lastName = useRef()
//   const email = useRef()
//   const username = useRef()
//   const bio = useRef()
//   const password = useRef()
//   const verifyPassword = useRef()
//   const passwordDialog = useRef()
//   const navigate = useNavigate()

//   const handleRegister = (e) => {
//     e.preventDefault()
    
//     if (password.current.value === verifyPassword.current.value) {
//       const newUser = {
//         username: username.current.value,
//         first_name: firstName.current.value,
//         last_name: lastName.current.value,
//         email: email.current.value,
//         password: password.current.value,
//         bio: bio.current.value
//       }

//       registerUser(newUser)
//         .then(res => {
//           if ("valid" in res && res.valid) {
//             setToken(res.token)
//             navigate("/")
//           }
//         })
//     } else {
//       passwordDialog.current.showModal()
//     }
//   }

//   return (
//     <section className="columns is-centered">
//       <form className="column is-two-thirds" onSubmit={handleRegister}>
//       <h1 className="title">Dungeon Docs</h1>
//         <p className="subtitle">Create an account</p>
//         <div className="field">
//           <label className="label">First Name</label>
//           <div className="control">
//             <input className="input" type="text" ref={firstName} />
//           </div>
//         </div>

//         <div className="field">
//           <label className="label">Last Name</label>
//           <div className="control">
//             <input className="input" type="text" ref={lastName} />
//           </div>
//         </div>

//         <div className="field">
//           <label className="label">Username</label>
//           <div className="control">
//             <input className="input" type="text" ref={username} />
//           </div>
//         </div>

//         <div className="field">
//           <label className="label">Email</label>
//           <div className="control">
//             <input className="input" type="email" ref={email} />
//           </div>
//         </div>

//         <div className="field">
//           <label className="label">Password</label>
//           <div className="field-body">
//             <div className="field">
//               <p className="control is-expanded">
//                 <input className="input" type="password" placeholder="Password" ref={password} />
//               </p>
//             </div>

//             <div className="field">
//               <p className="control is-expanded">
//                 <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} />
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="field">
//           <label className="label">Bio</label>
//           <div className="control">
//             <textarea className="textarea" placeholder="Tell us about yourself..." ref={bio}></textarea>
//           </div>
//         </div>

//         <div className="field is-grouped">
//           <div className="control">
//             <button className="button is-link" type="submit">Submit</button>
//           </div>
//           <div className="control">
//             <Link to="/login" className="button is-link is-light">Cancel</Link>
//           </div>
//         </div>

//       </form>
//     </section>
//   )
// }

import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";

export const Register = ({ setToken }) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const username = useRef();
  const bio = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value,
      };

      registerUser(newUser).then((res) => {
        if ("valid" in res && res.valid) {
          setToken(res.token);
          navigate("/");
        }
      });
    } else {
      // Implement your own way to handle password mismatch, for example, showing a message.
      console.error("Passwords do not match");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <form className="w-full max-w-md" onSubmit={handleRegister}>
        <h1 className="text-3xl font-bold mb-4">Dungeon Docs</h1>
        <p className="text-lg mb-4">Create an account</p>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={firstName} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={lastName} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={username} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" ref={email} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <div className="flex items-center">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Password" ref={password} />
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2" type="password" placeholder="Verify Password" ref={verifyPassword} />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Bio</label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Tell us about yourself..." ref={bio}></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
          </button>
          <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};
