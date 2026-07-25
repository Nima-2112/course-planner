<div className="product-card">
  <button className="favorite-btn" onClick={() => toggleFavorite(product.id)}>
    {favorites.includes(product.id) ? "❤️" : "🤍"}
  </button>

  <h2>{product.name}</h2>

  <p>${product.price}</p>

  <button onClick={() => addToCart(product.id)}>Add to Cart</button>
</div>;
