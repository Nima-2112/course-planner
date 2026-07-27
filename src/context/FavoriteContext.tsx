import { createContext } from "react";
import { useFavorites } from "../hooks/useFavorites";

interface FavoriteContextType {
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

export const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const {
    favorites,

    toggleFavorite,
  } = useFavorites();

  return (
    <FavoriteContext.Provider
      value={{
        favorites,

        toggleFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
