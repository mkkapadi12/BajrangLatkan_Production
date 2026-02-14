import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext";
import { WorkProvider } from "./context/WorkContext";
import { SalaryProvider } from "./context/SalaryContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminProvider>
      <AuthProvider>
        <WorkProvider>
          <SalaryProvider>
            <App />
          </SalaryProvider>
        </WorkProvider>
      </AuthProvider>
    </AdminProvider>
  </StrictMode>,
);
