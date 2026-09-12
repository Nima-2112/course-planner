//-------import-------
import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "../styles/Login.css";

//-------Component-------
function Login() {
  //-------State-------
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //-------Hooks-------
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  //-------Login Handler-------
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(username, password);

      const destination = location.state?.from || "/planner";

      navigate(destination);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  //-------Return-------
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>

        <p className="auth-description">
          Login to view and save your course planner.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter username"
            required
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
