//-------import-------
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "../styles/Login.css";

//-------Component-------
function Register() {
  //-------State-------
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //-------Hooks-------
  const { register } = useAuth();

  const navigate = useNavigate();

  //-------Register Handler-------
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await register(username, password);

      navigate("/planner");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  //-------Return-------
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>

        <p className="auth-description">
          Create an account to save your planner.
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
            placeholder="At least 6 characters"
            required
            minLength={6}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>

          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Repeat password"
            required
            minLength={6}
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
