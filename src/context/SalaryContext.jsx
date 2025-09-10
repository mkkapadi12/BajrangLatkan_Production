import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const SalaryContext = createContext();
const BASE_URL = "http://localhost:5000/api"; // Update with your actual base URL if needed
// const BASE_URL = "https://bajrang-latkan-production-server.vercel.app/api";

const SalaryProvider = ({ children }) => {
  useEffect(() => {}, [input]);

  return <SalaryContext.Provider value={{}}>{children}</SalaryContext.Provider>;
};

// Custom hook to use Work Context
const useSalaryContext = () => {
  return useContext(SalaryContext);
};

export { useSalaryContext, SalaryProvider };
