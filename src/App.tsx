import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import Favorites from "./pages/Favorites";
import HomeLoader from "./pages/HomeLoader";

import { products } from "./data/products";
import { useFavorites } from "./hooks/useFavorites";

import type { Product } from "./interfaces/Product";

function App() {
  const [productList, setProductList] = useState<Product[]>(products);

  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);

  // Favorite Hook
  //const { favorites, toggleFavorite } = useFavorites();

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
            <AddProduct products={productList} addNewProduct={addNewProduct} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
