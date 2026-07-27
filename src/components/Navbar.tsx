import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
function Navbar() {
  const { favorites } = useContext(FavoriteContext);
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
