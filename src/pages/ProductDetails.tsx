import "../styles/product-details.css";

import { Link, useParams } from "react-router-dom";

import { useCart } from "../hooks/useCart";
import { useToast } from "../hooks/useToast";

import { products } from "../data/products";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const { showToast } = useToast();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <main className="product-not-found">
        <h1>Product Not Found</h1>

        <Link to="/products">Back To Products</Link>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id);

    showToast("✔ Product Added");
  };

  return (
    <main className="product-details">
      <div className="product-details-image">
        <img src={product.image} alt={product.name} />
        <h1>{product.name}</h1>
      </div>

      <div className="product-details-info">
        <h1>{product.title}</h1>

        <p>Category: {product.category}</p>

        <h2>${product.price}</h2>

        <p>{product.description}</p>

        <button onClick={handleAddToCart}>Add To Cart</button>

        <Link to="/products">Back To Products</Link>
      </div>
    </main>
  );
}

export default ProductDetails;
