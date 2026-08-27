import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { KeranjangProvider } from "./context/KeranjangContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <KeranjangProvider>
        <App />
      </KeranjangProvider>
    </AuthProvider>
  </StrictMode>
);