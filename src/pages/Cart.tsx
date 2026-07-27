import "../styles/Layout.css";
import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";

function Cart({
  products,
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
}: any) {
  if (cart.length === 0) {
    return <h2 style={{ textAlign: "center" }}>Your Cart is Empty</h2>;
  }

  const cartItems = cart.map((item: any) => {
    const product = products.find((p: any) => p.id === item.id);

    return {
      ...product,
      quantity: item.quantity,
    };
  });

  const subtotal = cartItems.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0,
  );

  const tax = subtotal * 0.1;

  const discount = subtotal > 2000 ? 100 : 0;

  const shipping = subtotal > 1000 ? 0 : 20;

  const total = subtotal + tax + shipping - discount;

  const { favorites, toggleFavorite } = useContext(FavoriteContext);

  const totalQuantity = cart.reduce(
    (total: number, item: any) => total + item.quantity,
    0,
  );

  return (
    <div>
      <h1>Shopping Cart</h1>

      {cartItems.map((product: any) => (
        <div className="card" key={product.id}>
          <h2>{product.name}</h2>

          <p>Price : ${product.price}</p>

          <div className="quantity-box">
            <button onClick={() => decreaseQuantity(product.id)}>-</button>
            <button
              className="remove-btn"
              onClick={() => removeFromCart(product.id)}
            >
              Remove
            </button>
            <span>{product.quantity}</span>

            <button onClick={() => increaseQuantity(product.id)}>+</button>
            <button
              className="favorite-btn"
              onClick={() => toggleFavorite(product.id)}
            >
              {favorites.includes(product.id) ? "❤️" : "🤍"}
            </button>
          </div>

          <p>Subtotal : ${product.price * product.quantity}</p>
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

        <button className="clear-cart-btn" onClick={clearCart}>
          🗑 Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
