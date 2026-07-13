import "../styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul
        style={{
          display: "flex",
          gap: "20px",
          listStyle: "none",
          padding: "20px",
        }}
      >
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/catalog">Course Catalog</Link>
        </li>

        <li>
          <Link to="/planner">My Planner</Link>
        </li>

        <li>
          <Link to="/add-course">Add Course</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
