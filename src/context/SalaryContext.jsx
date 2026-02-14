import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { api } from "@/services/Worker/api";

const SalaryContext = createContext();
const BASE_URL = "http://localhost:5000/api"; // Update with your actual base URL if needed
// const BASE_URL = "https://bajrang-latkan-production-server.vercel.app/api";

const SalaryProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [selectedMonth, setSelectedMonth] = useState("February 2026");

  const [loading, setLoading] = useState(false);
  const [salaryDetails, setSalaryDetails] = useState();

  const currentMonthData =
    salaryDetails?.months?.find((month) => month.month === selectedMonth) ||
    null;

  const fetchSalaryHistory = async () => {
    setLoading(true);
    try {
      const data = await api.getSalaryDetails(user?._id);
      // console.log("Salary Details:", data);
      setSalaryDetails(data.salaryDetails); // if you want to store in state
    } catch (error) {
      console.error("Error fetching salary history:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user?._id) {
      fetchSalaryHistory();
    }
  }, [user, selectedMonth]);

  return (
    <SalaryContext.Provider
      value={{
        selectedMonth,
        setSelectedMonth,
        fetchSalaryHistory,
        currentMonthData,
        loading,
        salaryDetails,
      }}
    >
      {children}
    </SalaryContext.Provider>
  );
};

// Custom hook to use Work Context
const useSalaryContext = () => {
  return useContext(SalaryContext);
};

export { useSalaryContext, SalaryProvider };
