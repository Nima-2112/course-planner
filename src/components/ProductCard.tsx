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
  product: {
    id: number;
    code: string;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
  };
  isAdded: boolean;
  addToCart: (id: number) => void;
};

function ProductCard({ product, isAdded, addToCart }: ProductCardProps) {
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

      <button disabled={isAdded} onClick={() => addToCart(product.id)}>
        {isAdded ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;
