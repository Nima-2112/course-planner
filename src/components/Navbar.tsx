//-------import-------
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "../styles/Navbar.css";

//-------Component-------
function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();

  const navigate = useNavigate();

  //-------Logout-------
  function handleLogout() {
    logout();

    navigate("/");
  }

  //-------Navigation Class-------
  function getNavClass({ isActive }: { isActive: boolean }) {
    return isActive ? "navbar-link active" : "navbar-link";
  }

  //-------Return-------
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-mark">CP</span>

          <span>Course Planner</span>
        </Link>

        <nav className="navbar-links" aria-label="Main navigation">
          <NavLink to="/" className={getNavClass} end>
            Home
          </NavLink>

          <NavLink to="/catalog" className={getNavClass}>
            Course Catalog
          </NavLink>

          <NavLink to="/planner" className={getNavClass}>
            My Planner
          </NavLink>

          <NavLink to="/add-course" className={getNavClass}>
            Add Course
          </NavLink>
        </nav>

        <div className="navbar-account">
          {isLoggedIn ? (
            <>
              <div className="navbar-user">
                <span className="navbar-user-avatar">
                  {user?.username.charAt(0).toUpperCase()}
                </span>

                <span>{user?.username}</span>
              </div>

              <button
                type="button"
                className="navbar-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-login">
                Login
              </Link>

              <Link to="/register" className="navbar-register">
                Create account
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
