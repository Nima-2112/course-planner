//-------import-------
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

//-------Component-------
function Navbar() {
  //-------Auth-------
  const { user, logout } = useAuth();

  //-------Return-------
  return (
    <nav>
      <ul
        style={{
          display: "flex",
          gap: "20px",
          listStyle: "none",
          padding: "20px",
          alignItems: "center",
        }}
      >
        {/*-------Home-------*/}
        <li>
          <Link to="/">Home</Link>
        </li>

        {/*-------Catalog-------*/}
        <li>
          <Link to="/catalog">Course Catalog</Link>
        </li>

        {/*-------Planner-------*/}
        <li>
          <Link to="/planner">My Planner</Link>
        </li>

        {/*-------Add Course-------*/}
        <li>
          <Link to="/add-course">Add Course</Link>
        </li>

        {/*-------Authentication-------*/}
        <li className="navbar-auth">
          {user ? (
            <>
              <span className="navbar-user">Welcome, {user.username}</span>

              <button onClick={logout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

//-------Export-------
export default Navbar;
