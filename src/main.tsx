//-------import-------

import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.tsx";

import AuthProvider from "./context/AuthContext";

import PlannerProvider from "./context/PlannerContext";

//-------Render-------

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <PlannerProvider>
        <App />
      </PlannerProvider>
    </AuthProvider>
  </StrictMode>,
);
