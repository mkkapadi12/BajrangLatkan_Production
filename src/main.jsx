import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AdminProvider>
  </StrictMode>
);
