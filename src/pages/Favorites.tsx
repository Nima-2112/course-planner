import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import type { Product } from "../interfaces/Product";
import "../styles/Layout.css";

interface FavoritesProps {
  products: Product[];
}

function Favorites({ products }: FavoritesProps) {
  const { favorites, toggleFavorite } = useContext(FavoriteContext);

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id),
  );

  return (
    <div className="page">
      <h1>❤️ My Favorites</h1>
      {favoriteProducts.length === 0 ? (
        <div className="empty">
          <h2>No Favorite Products</h2>
          <p>Your wishlist is empty.</p>
        </div>
      ) : (
        <div className="grid">
          {favoriteProducts.map((product) => (
            <div className="card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>

              <p>
                <strong>Code:</strong> {product.code}
              </p>

              <p>
                <strong>Category:</strong> {product.category}
              </p>

              <p>
                <strong>Price:</strong> ${product.price}
              </p>

              <p>{product.description}</p>

              <button
                className="favorite-btn"
                onClick={() => toggleFavorite(product.id)}
              >
                ❤️ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
