import React, { useState, useEffect } from "react";
import Modal from "../components/ui/Modal";
import { api } from "../services/api";
import { Button } from "@/components/ui/Button";

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    role: "",
    status: "",
    sortBy: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    skills: "",
    experience: "",
    salary: "",
    status: "Active",
    avatar: "https://placehold.co/400",
  });

  useEffect(() => {
    fetchWorkers();
  }, [filters]);

  const fetchWorkers = async () => {
    try {
      const data = await api.getWorkers(filters);
      setWorkers(data);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert skills string to array and format data
      const workerData = {
        ...formData,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
        experience: Number(formData.experience),
        salary: Number(formData.salary),
      };

      await api.createWorker(workerData);
      setIsModalOpen(false);
      setFormData({
        name: "",
        role: "",
        skills: "",
        experience: "",
        salary: "",
        status: "Active",
        avatar: "https://placehold.co/400",
      });
      fetchWorkers();
    } catch (error) {
      console.error("Error adding worker:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Workers</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add New Worker</Button>
      </div>

      <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <input
            type="text"
            name="name"
            placeholder="Filter by name..."
            value={filters.name}
            onChange={handleFilterChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="role"
            placeholder="Filter by role..."
            value={filters.role}
            onChange={handleFilterChange}
            className="p-2 border rounded-md"
          />
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="p-2 border rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="p-2 border rounded-md"
          >
            <option value="">Sort by</option>
            <option value="experience-asc">Experience: Low to High</option>
            <option value="experience-desc">Experience: High to Low</option>
            <option value="salary-asc">Salary: Low to High</option>
            <option value="salary-desc">Salary: High to Low</option>
          </select>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Worker"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience (years)
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end mt-6 space-x-3">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Worker</Button>
          </div>
        </form>
      </Modal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {workers.map((worker) => (
          <div
            key={worker._id || worker.id}
            className="p-4 transition-shadow bg-white rounded-lg shadow-md hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="object-cover w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {worker.name}
                </h3>
                <p className="text-gray-600">{worker.role}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">
                Skills: {worker.skills.join(", ")}
              </p>
              <p className="mt-2 text-gray-600">
                Experience: {worker.experience} years
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-bold text-purple-600">
                ₹{worker.salary}/month
              </span>
              <span
                className={`px-2 py-1 rounded ${
                  worker.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {worker.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workers;
