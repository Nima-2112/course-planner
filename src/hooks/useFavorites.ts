import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("favorites");

    if (data) {
      setFavorites(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favorites",

      JSON.stringify(favorites),
    );
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(
      "favorites",

      JSON.stringify(favorites),
    );
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return {
    favorites,

    toggleFavorite,
  };
}
