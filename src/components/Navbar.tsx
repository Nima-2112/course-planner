import "../styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home-loading">Home</Link>
          <Link to="Favorites ({favorites.length})">Favorites</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/cart">Shopping Cart</Link>
        </li>

        <li>
          <Link to="/add-product">Add Product</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
