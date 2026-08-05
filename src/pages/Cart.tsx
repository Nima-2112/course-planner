import { useContext } from "react";

import "../styles/Layout.css";

import { FavoriteContext } from "../context/FavoriteContext";
import { useToast } from "../hooks/useToast";

import type { Product } from "../interfaces/Product";

type CartItem = {
  id: number;
  quantity: number;
};

type CartProduct = Product & {
  quantity: number;
};

type CartProps = {
  products: Product[];
  cart: CartItem[];

  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

function Cart({
  products,
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
}: CartProps) {
  // ---------------- Favorite ----------------

  const { favorites, toggleFavorite } = useContext(FavoriteContext);

  // ---------------- Toast ----------------

  const { showToast } = useToast();

  // ---------------- Build Cart ----------------

  const cartItems: CartProduct[] = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);

      if (!product) return null;

      return {
        ...product,
        quantity: item.quantity,
      };
    })
    .filter((item): item is CartProduct => item !== null);

  // ---------------- Totals ----------------

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const tax = subtotal * 0.1;

  const discount = subtotal > 2000 ? 100 : 0;

  const shipping = subtotal > 1000 ? 0 : 20;

  const total = subtotal + tax + shipping - discount;

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  // ---------------- Empty Cart ----------------

  if (cartItems.length === 0) {
    return <h2 style={{ textAlign: "center" }}>Your Cart is Empty</h2>;
  }

  // ---------------- Render ----------------

  return (
    <div>
      <h1>Shopping Cart</h1>

      {cartItems.map((product) => (
        <div className="card" key={product.id}>
          <h2>{product.name}</h2>

          <p>Price : ${product.price}</p>

          <div className="quantity-box">
            <button
              onClick={() => {
                decreaseQuantity(product.id);

                showToast("✔ Quantity Updated");
              }}
            >
              -
            </button>

            <span>{product.quantity}</span>

            <button
              onClick={() => {
                increaseQuantity(product.id);

                showToast("✔ Quantity Updated");
              }}
            >
              +
            </button>

            <button
              className="remove-btn"
              onClick={() => {
                removeFromCart(product.id);

                showToast("✔ Removed");
              }}
            >
              Remove
            </button>

            <button
              className="favorite-btn"
              onClick={() => {
                toggleFavorite(product.id);

                showToast(
                  favorites.includes(product.id)
                    ? "🤍 Removed Favorite"
                    : "❤️ Added To Favorite",
                );
              }}
            >
              {favorites.includes(product.id) ? "❤️" : "🤍"}
            </button>
          </div>

          <p>Subtotal : ${(product.price * product.quantity).toFixed(2)}</p>
        </div>
      ))}

      <div className="cart-summary">
        <h2>Order Summary</h2>

        <p>
          <span>Subtotal</span>

          <span>${subtotal.toFixed(2)}</span>
        </p>

        <p>
          <span>Tax (10%)</span>

          <span>${tax.toFixed(2)}</span>
        </p>

        <p>
          <span>Discount</span>

          <span>-${discount.toFixed(2)}</span>
        </p>

        <p>
          <span>Shipping</span>

          <span>${shipping.toFixed(2)}</span>
        </p>

        <p>
          <span>Total Items</span>

          <span>{totalQuantity}</span>
        </p>

        <hr />

        <h3>
          <span>Total</span>

          <span>${total.toFixed(2)}</span>
        </h3>

        <button
          className="clear-cart-btn"
          onClick={() => {
            clearCart();

            showToast("🗑 Cart Cleared");
          }}
        >
          🗑 Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
