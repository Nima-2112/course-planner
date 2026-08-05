import { useState } from "react";

export function usePagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  return {
    currentPage,

    setCurrentPage,

    productsPerPage,
  };
}
