import axios from "axios";

// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "https://bajrang-latkan-production-server.vercel.app/api";

export const api = {
  // get Worker services

  // 1.get all wokers list
  async getAllWorkers({
    name,
    village,
    gender,
    status,
    phone,
    sortBy,
    page = 1,
    limit = 10,
  }) {
    const params = new URLSearchParams({
      ...(name && { name }),
      ...(village && { village }),
      ...(phone && { phone }),
      ...(gender !== "all" && { gender }),
      ...(status !== "all" && { status }),
    }).toString();

    const response = await fetch(`${BASE_URL}/workers/getAll?${params}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch workers");
    const workersData = await response.json();
    return workersData;
  },

  // 2. get all workers details by id
  async getworkerdetails(id) {
    const response = await fetch(`${BASE_URL}/workers/getworker/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch worker details");
    const workerDetails = await response.json();
    return workerDetails;
  },

  // Worker CRUD operations

  // update
  async updateWorker(id, data) {
    const response = await fetch(`${BASE_URL}/workers/updateworker/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // delete
  async deleteWorker(id) {
    const response = await fetch(`${BASE_URL}/workers/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },

  // Worker Auth Services

  // 1. worker signup
  async createUser(data) {
    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // if (!response.ok) throw new Error("Failed to create user");
      return response.json();
    } catch (error) {
      console.error(error.message);
    }
  },

  // 2. worker login
  async login(data) {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // if (!response.ok) throw new Error("Failed to create user");
      return response;
    } catch (error) {
      console.error(error.message);
    }
  },

  //Admin Auth Services

  // 1. admin sign up
  async adminSignup(data) {
    try {
      const response = await fetch(`${BASE_URL}/admin/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // if (!response.ok) throw new Error("Failed to create user");
      return response;
    } catch (error) {
      console.error(error.message);
    }
  },

  // 2. admin login
  async adminLogin(data) {
    try {
      const response = await fetch(`${BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // if (!response.ok) throw new Error("Failed to create user");
      return response;
    } catch (error) {
      console.error(error.message);
    }
  },

  //Salary Services

  // 1. get all worker salary details
  async getSalaryDetails() {
    const response = await fetch(`${BASE_URL}/salary/salarydetails`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch salary details");

    const salarydetails = await response.json(); // ✅ FIX
    // console.log("salaries :", salarydetails);
    return salarydetails;
  },

  // 2. get particular worker salary details
  async getSalaryDetailsByWorker(workerId) {
    const response = await fetch(`${BASE_URL}/salary/worker/${workerId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
    if (!response.ok)
      throw new Error("Failed to fetch salary details for worker");
    const salaryDetails = await response.json();
    return salaryDetails;
  },

  //Payment Monthly salary
  async payMonthlySalary(payload) {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/salary/pay-monthly-salary`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        },
      );
      return data;
    } catch (error) {
      console.error("Error paying monthly salary:", error);
      throw error;
    }
  },
};
