import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const WorkerContext = createContext();
// const BASE_URL = "http://localhost:5000/api"; // Update with your actual base URL if needed
const BASE_URL = "https://bajrang-latkan-production-server.vercel.app/api";

const WorkerProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("adminToken") || null
  );
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const authorizationToken = `Bearer ${token}`;

  const fetchWorkers = async () => {
    if (!token) return; // Skip if no token is available
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/workers/getworkers`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      //   console.log("Fetched Workers:", response.data);
      setWorkers(response.data.workers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching workers:", error);
    } finally {
      setLoading(false);
    }
  };

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
    <WorkerContext.Provider
      value={{ workers, fetchWorkers, loading, adddailyWork }}
    >
      {children}
    </WorkerContext.Provider>
  );
};

// Custom hook to use Admin Context
const useWorkerContext = () => {
  return useContext(WorkerContext);
};

export { useWorkerContext, WorkerProvider };
