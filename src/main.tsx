import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

import { ThemeProvider } from "./context/ThemeContext";
import { FavoriteProvider } from "./context/FavoriteContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FavoriteProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </FavoriteProvider>
  </StrictMode>,
);
