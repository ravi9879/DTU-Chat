import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Url from "../stores/Url";

// Import Bootstrap CSS in your index.js or App.js if not already imported:
// import 'bootstrap/dist/css/bootstrap.min.css';

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
          withCredentials: true,
        })
        .then((res) => {
          setLoading(false);
          if (res.data.Status === "Success") {
            window.localStorage.setItem("token", res.data.token);
            av("/home");
          } else {
            av("/sign-up");
          }
        });
    } catch (err) {
      setLoading(false);
      av("/error");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status"></div>
          <div className="mt-4 fw-semibold text-primary fs-5">
            Logging in...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ minWidth: 350, maxWidth: 400 }}>
        <h2 className="text-center mb-4 text-primary">Login</h2>
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