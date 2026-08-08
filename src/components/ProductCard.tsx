export type Product = {
  id: number;
  code: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

import "../styles/Card.css";

type ProductCardProps = {
  product: Product;

  isAdded: boolean;

  addToCart: (id: number) => void;

  isFavorite: boolean;

  toggleFavorite: (id: number) => void;
  openModal: (product: Product) => void;
};

function ProductCard({
  product,
  isAdded,
  addToCart,
  isFavorite,
  toggleFavorite,
  openModal,
}: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <h2>{product.name}</h2>

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
      <button onClick={() => toggleFavorite(product.id)}>
        {isFavorite ? "❤️" : "🤍"}
      </button>
      <button disabled={isAdded} onClick={() => addToCart(product.id)}>
        {isAdded ? "Added" : "Add to Cart"}
      </button>
      <button onClick={() => openModal(product)}>View Details</button>
    </div>
  );
}

export default ProductCard;
