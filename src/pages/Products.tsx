import { useState } from "react";
import "../styles/Layout.css";

import ProductCard from "../components/ProductCard";

type ProductsProps = {
  products: any[];
  cart: { id: number; quantity: number }[];
  addToCart: (id: number) => void;

  favorites: number[];
  toggleFavorite: (id: number) => void;
};

function Products({
  products,
  cart,
  addToCart,
  favorites,
  toggleFavorite,
}: ProductsProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Search + Filter
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category === "All" || product.category === category;

    return matchSearch && matchCategory;
  });

  // Sort
  const sortedProducts = [...filteredProducts];

  switch (sortBy) {
    case "low":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;

    case "high":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;

    case "az":
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "za":
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;

    default:
      break;
  }

  return (
    <div className="page">
      <h1>Products</h1>

      <div className="filter-container">
        <input
          className="search-box"
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter-box"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Sports">Sports</option>
        </select>

        <select
          className="sort-box"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="az">Name: A-Z</option>
          <option value="za">Name: Z-A</option>
        </select>
      </div>

      <div className="grid">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isAdded={cart.some((item) => item.id === product.id)}
            addToCart={addToCart}
            isFavorite={favorites.includes(product.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
