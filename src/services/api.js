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

  // Workers
  async getWorkers(filters) {
    const params = new URLSearchParams(filters).toString();
    const response = await fetch(`${BASE_URL}/workers?${params}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("workertoken")}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch workers");
    return response.json();
  },

  async getWorker(id) {
    const response = await fetch(`${BASE_URL}/workers/${id}`);
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
      console.log("API Data:", data);
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
};
