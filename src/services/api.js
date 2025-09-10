// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "https://bajrang-latkan-production-server.vercel.app/api";

export const api = {
  // Products
  async getProducts(filters) {
    const params = new URLSearchParams(filters).toString();
    const response = await fetch(`${BASE_URL}/products?${params}`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  },

  async createProduct(data) {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async updateProduct(id, data) {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async deleteProduct(id) {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },

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

  async getWorker(id) {
    const response = await fetch(`${BASE_URL}/getworker/${id}`);
    if (!response.ok) throw new Error("Failed to fetch worker");
    return response.json();
  },

  async createWorker(data) {
    const response = await fetch(`${BASE_URL}/workers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async updateWorker(id, data) {
    const response = await fetch(`${BASE_URL}/workers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async deleteWorker(id) {
    const response = await fetch(`${BASE_URL}/workers/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },

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
    return response.json();
  },
};
