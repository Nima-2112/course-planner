import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useState } from "react";

import Navbar from "./components/Navbar";
import Toast from "./components/Toast";

import Home from "./pages/Home";
import HomeLoader from "./pages/HomeLoader";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import AddProduct from "./pages/AddProduct";

import { ThemeContext } from "./context/ThemeContext";

import { products } from "./data/products";
import type { Product } from "./interfaces/Product";

import "./styles/theme.css";
import "./styles/modal.css";
import "./styles/loader.css";

function App() {
  // ===============================
  // Theme
  // ===============================

  const { darkMode } = useContext(ThemeContext);

  // ===============================
  // Products
  // ===============================

  const [productList, setProductList] = useState<Product[]>(products);

  // ===============================
  // Shopping Cart
  // ===============================

  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);

  // ===============================
  // Add To Cart
  // ===============================

  const addToCart = (id: number) => {
    setCart((prevCart) => {
      const exist = prevCart.find((item) => item.id === id);

      if (exist) {
        return prevCart.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...prevCart,
        {
          id,
          quantity: 1,
        },
      ];
    });
  };

  // ===============================
  // Increase Quantity
  // ===============================

  const increaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  // ===============================
  // Decrease Quantity
  // ===============================

  const decreaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // ===============================
  // Remove Product
  // ===============================

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // ===============================
  // Clear Cart
  // ===============================

  const clearCart = () => {
    setCart([]);
  };

  // ===============================
  // Add New Product
  // ===============================

  const addNewProduct = (newProduct: Product) => {
    setProductList((prevProducts) => [...prevProducts, newProduct]);
  };

  // ===============================
  // Render
  // ===============================

  return (
    <div className={darkMode ? "dark" : "light"}>
      <BrowserRouter>
        {/* Toast Notification */}
        <Toast />

        {/* Navigation */}
        <Navbar />

        {/* Pages */}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/home-loading" element={<HomeLoader />} />

          <Route
            path="/products"
            element={
              <Products
                products={productList}
                cart={cart}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                products={productList}
                cart={cart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            }
          />

          <Route
            path="/favorites"
            element={<Favorites products={productList} />}
          />

          <Route
            path="/add-product"
            element={
              <AddProduct
                products={productList}
                addNewProduct={addNewProduct}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
