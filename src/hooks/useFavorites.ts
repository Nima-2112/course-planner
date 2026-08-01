import { useState, useEffect } from "react";

export function useFavorites() {
  // لیست علاقه‌مندی‌ها
  const [favorites, setFavorites] = useState<number[]>([]);

  // فقط یک بار هنگام اجرای برنامه
  useEffect(() => {
    const data = localStorage.getItem("favorites");

    if (data) {
      try {
        setFavorites(JSON.parse(data));
      } catch (error) {
        console.error("Error reading favorites:", error);
        localStorage.removeItem("favorites");
      }
    }
  }, []);

  // هر بار favorites تغییر کند در LocalStorage ذخیره می‌شود
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // افزودن یا حذف محصول از علاقه‌مندی‌ها
  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((item) => item !== id);
      }

      return [...prevFavorites, id];
    });
  };

  return {
    favorites,
    toggleFavorite,
  };
}
