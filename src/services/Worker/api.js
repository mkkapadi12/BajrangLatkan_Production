import axios from "axios";

// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "https://bajrang-latkan-production-server.vercel.app/api";

export const api = {
  async getWorkHistory(workerId, monthYear) {
    try {
      const response = await axios.get(`${BASE_URL}/workerdata/workhistory`, {
        params: {
          workerId,
          monthYear, // e.g., "September 2025"
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("workertoken")}`,
        },
      });

      // console.log("Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching work history:", error.message);
      throw error;
    }
  },
};
