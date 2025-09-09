import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const WorkContext = createContext();
// const BASE_URL = "http://localhost:5000/api"; // Update with your actual base URL if needed
const BASE_URL = "https://bajrang-latkan-production-server.vercel.app/api";

const WorkProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("adminToken") || null
  );
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const authorizationToken = `Bearer ${token}`;

  //get all workers
  const fetchWorkers = async () => {
    if (!token) return; // Skip if no token is available
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/workers/getworkers`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      // console.log("Fetched Workers:", response.data);
      setWorkers(response.data.workers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  //add daily work of each worker
  const adddailyWork = async ({ workerId, date, products }) => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${BASE_URL}/work/adddailywork`,
        {
          workerId,
          date,
          products,
        },
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (response.data) {
        toast.success("Work added successfully");
        // console.log("Work added successfully:", response.data);
      }
    } catch (error) {
      toast.error("Failed to add work");
      console.error("Error adding daily work:", error);
    }
  };

  // get monthly work of each worker
  const getMonthlyWork = async (workerId, monthYear) => {
    if (!token) return;
    try {
      const response = await axios.get(`${BASE_URL}/work/monthly`, {
        params: {
          workerId,
          monthYear, // e.g., "2025-09"
        },
        headers: {
          Authorization: authorizationToken,
        },
      });
      // console.log("Monthly Work:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching monthly work:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  useEffect(() => {
    if (token) {
      fetchWorkers();
    }
  }, [token]);

  // Effect to sync token with localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    setToken(storedToken);
  }, []);

  return (
    <WorkContext.Provider
      value={{
        workers,
        fetchWorkers,
        loading,
        adddailyWork,
        setLoading,
        getMonthlyWork,
        token,
      }}
    >
      {children}
    </WorkContext.Provider>
  );
};

// Custom hook to use Admin Context
const useWorkContext = () => {
  return useContext(WorkContext);
};

export { useWorkContext, WorkProvider };
