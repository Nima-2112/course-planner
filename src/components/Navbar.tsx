//-------import-------
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "../styles/Navbar.css";

//-------Component-------
function Navbar() {
  //-------Authentication-------
  const { user, isLoggedIn, logout } = useAuth();

  //-------Navigation-------
  const navigate = useNavigate();

  //-------Logout Handler-------
  function handleLogout() {
    logout();

    navigate("/login");
  }

  //-------Return-------
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          Course Planner
        </Link>

        <Link to="/">Home</Link>

        <Link to="/catalog">Catalog</Link>

        <Link to="/planner">My Planner</Link>

        <Link to="/add-course">Add Course</Link>
      </div>

      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <span className="navbar-user">Welcome, {user?.username}</span>

            <button className="navbar-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="navbar-login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
