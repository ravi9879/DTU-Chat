import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Url from "../stores/Url";

// Make sure Bootstrap CSS is imported in your index.js or App.js
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignUp() {
  const password = useRef();
  const email = useRef();
  const av = useNavigate();
  const [loading, setLoading] = useState(false);

  const studentLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      axios
        .post(`${Url}/signUp/`, {
          email: email.current.value,
          password: password.current.value,
        })
        .then((res) => {
          setLoading(false);
          av("/");
        });
    } catch (err) {
      setLoading(false);
      console.log("error at client side", err);
      av("/error");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status"></div>
          <div className="mt-4 fw-semibold text-primary fs-5">
            Signing up...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ minWidth: 350, maxWidth: 400 }}>
        <h2 className="text-center mb-4 text-primary">Sign Up</h2>
        <form onSubmit={studentLogin}>
          <div className="mb-3">
            <label className="form-label">Email Id</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              ref={email}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              ref={password}
              className="form-control"
              required
            />
          </div>
          <button
            className="btn btn-primary w-100 fw-semibold"
            type="submit"
          >
            Submit
          </button>
        </form>
        <p className="text-center mt-3 text-secondary">
          Not a user? Please contact{" "}
          <Link to="/admin" className="text-danger fw-semibold text-decoration-underline">
            Admin
          </Link>
        </p>
      </div>
    </div>
  );
}