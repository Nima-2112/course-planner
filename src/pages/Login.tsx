import "../styles/login.css";
import { useState } from "react";
import type { FormEvent } from "react";

import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

function Login() {
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setError("");

    const success = login(username, password);

    if (success) {
      const from = location.state?.from?.pathname || "/";

      navigate(from, {
        replace: true,
      });

      return;
    }

    setError("نام کاربری یا رمز عبور اشتباه است.");
  };

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div>
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="admin"
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="123456"
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button type="submit">Login</button>

        <p>
          Test account:
          <br />
          admin / 123456
        </p>
      </form>
    </main>
  );
}

export default Login;
