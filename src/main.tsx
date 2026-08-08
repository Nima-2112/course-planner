import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import { ToastProvider } from "./context/ToastContext";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <FavoriteProvider>
        <ToastProvider>
          <CartProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </CartProvider>
        </ToastProvider>
      </FavoriteProvider>
    </AuthProvider>
  </StrictMode>,
);
