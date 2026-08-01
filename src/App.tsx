import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import AddProduct from "./pages/AddProduct";
import HomeLoader from "./pages/HomeLoader";

import { products } from "./data/products";
import type { Product } from "./interfaces/Product";

import { ThemeContext } from "./context/ThemeContext";

import "./styles/theme.css";

function App() {
  // Theme Context
  const { darkMode } = useContext(ThemeContext);

  // Products
  const [productList, setProductList] = useState<Product[]>(products);

  // Cart
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);

  // ---------------- CART ----------------

  const addToCart = (id: number) => {
    const exist = cart.find((item) => item.id === id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          id,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseQuantity = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // ---------------- PRODUCTS ----------------

  const addNewProduct = (newProduct: Product) => {
    setProductList([...productList, newProduct]);
  };

  return (
    <div className={darkMode ? "dark" : "light"}>
      <BrowserRouter>
        <Navbar />

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
