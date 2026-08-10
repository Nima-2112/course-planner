import { FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  if (isAuthenticated) {
    navigate("/");
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setError("");

    const success = login(username, password);

    if (success) {
      navigate("/");
    } else {
      setError("Username or password is incorrect.");
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
