import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext";
import { WorkProvider } from "./context/WorkContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminProvider>
      <AuthProvider>
        <WorkProvider>
          <App />
        </WorkProvider>
      </AuthProvider>
    </AdminProvider>
  </StrictMode>
);
