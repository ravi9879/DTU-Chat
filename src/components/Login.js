import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link, redirect } from "react-router-dom";
import Url from "../stores/Url";

export default function Lo() {
  const password = useRef(); 
  const email = useRef();
  const av = useNavigate();
  const [loading, setLoading] = useState(false);

  const studentLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      axios
        .post(`${Url}/login/`, {
          email: email.current.value,
          password: password.current.value,
        })
        .then((res) => {
          setLoading(false);
          console.log(res) ;
          if (res.data.Status === "Success") {
            window.localStorage.setItem("token", res.data.token);
            av("/chat");
          }
          else {
            av("/sign-up") ;
          }
        });
    } catch (err) {
      setLoading(false);
      console.log("error at client side", err);
      av("/error");
    }
  };
 

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-85 z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="mt-4 font-semibold text-blue-600 text-lg">
            Logging in...
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
            Login
          </h2>
          <form onSubmit={studentLogin}>
            <div className="mb-4">
              <label className="block font-medium mb-1">Email Id</label>
              <input
                type="text"
                name="email"
                placeholder="Enter your roll no"
                ref={email}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                ref={password}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
              type="submit"
            >
              Submit
            </button>
          </form>
          <p className="text-center mt-4 text-gray-500">
            Not a user? Please contact{" "}
            <Link
              to="/admin"
              className="text-red-600 font-semibold hover:underline"
            >
              Admin
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
