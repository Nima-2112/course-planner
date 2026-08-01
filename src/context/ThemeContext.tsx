import { createContext } from "react";
import { useTheme } from "../hooks/useTheme";

interface ThemeContextType {
  darkMode: boolean;

  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,

  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const {
    darkMode,

    toggleTheme,
  } = useTheme();

  return (
    <ThemeContext.Provider
      value={{
        darkMode,

        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
