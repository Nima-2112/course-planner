import { useState, useContext, useEffect } from "react";

import { FavoriteContext } from "../context/FavoriteContext";
import { useToast } from "../hooks/useToast";
import { usePagination } from "../hooks/usePagination";

import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import ProductSkeleton from "../components/ProductSkeleton";

import type { Product } from "../interfaces/Product";

import "../styles/Layout.css";

type ProductsProps = {
  products: Product[];
  cart: { id: number; quantity: number }[];
  addToCart: (id: number) => void;
};

function Products({ products, cart, addToCart }: ProductsProps) {
  // ---------------- Loading ----------------

  const [loading, setLoading] = useState(true);

  // ---------------- Favorite ----------------

  const { favorites, toggleFavorite } = useContext(FavoriteContext);

  // ---------------- Toast ----------------

  const { showToast } = useToast();

  // ---------------- Search ----------------

  const [search, setSearch] = useState("");

  // ---------------- Filter ----------------

  const [category, setCategory] = useState("All");

  // ---------------- Sort ----------------

  const [sortBy, setSortBy] = useState("default");

  // ---------------- Modal ----------------

  const [isOpen, setIsOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // ---------------- Pagination ----------------

  const { currentPage, setCurrentPage, productsPerPage } = usePagination();

  // ---------------- Search + Filter ----------------

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category === "All" || product.category === category;

    return matchSearch && matchCategory;
  });

  // ---------------- Sorting ----------------

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

  // ---------------- Pagination ----------------

  const lastProduct = currentPage * productsPerPage;

  const firstProduct = lastProduct - productsPerPage;

  const currentProducts = sortedProducts.slice(firstProduct, lastProduct);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // ---------------- Scroll To Top ----------------

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  // ---------------- Reset Page ----------------

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sortBy, setCurrentPage]);

  // ---------------- Loading ----------------

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // ---------------- Loading UI ----------------

  if (loading) {
    return (
      <>
        <Loader />

        <div className="products-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </>
    );
  }

  // ---------------- Render ----------------

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
          <option value="Books">Books</option>
          <option value="Sports">Sports</option>
          <option value="Clothing">Clothing</option>
          <option value="Home">Home</option>
        </select>

        <select
          className="sort-box"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default</option>

          <option value="low">Price Low → High</option>

          <option value="high">Price High → Low</option>

          <option value="az">Name A → Z</option>

          <option value="za">Name Z → A</option>
        </select>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2>{selectedProduct?.name}</h2>

        <img
          src={selectedProduct?.image}
          alt={selectedProduct?.name}
          style={{
            width: "100%",
            maxHeight: "250px",
            objectFit: "cover",
          }}
        />

        <p>{selectedProduct?.description}</p>

        <h3>${selectedProduct?.price}</h3>
      </Modal>

      <div className="grid">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isAdded={cart.some((item) => item.id === product.id)}
            addToCart={(id) => {
              addToCart(id);
              showToast("✔ Product Added");
            }}
            isFavorite={favorites.includes(product.id)}
            toggleFavorite={(id) => {
              toggleFavorite(id);
              showToast("❤️ Added To Favorite");
            }}
            openModal={openModal}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Products;
