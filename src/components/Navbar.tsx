import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";

import ThemeButton from "./ThemeButton";
import { FavoriteContext } from "../context/FavoriteContext";

function Navbar() {
  const { favorites } = useContext(FavoriteContext);

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/home-loading">Home</Link>

        <Link to="/favorites">Favorites ({favorites.length})</Link>

        <Link to="/products">Products</Link>

        <Link to="/cart">Shopping Cart</Link>

        <Link to="/add-product">Add Product</Link>
      </div>

      <ThemeButton />
    </nav>
  );
}

export default Navbar;
