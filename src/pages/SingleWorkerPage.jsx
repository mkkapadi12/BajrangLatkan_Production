import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { Button } from "@/components/ui/Button";

const SingleWorkerPage = () => {
  const { id } = useParams();
  console.log("Worker ID:", id); // Debugging line to check the worker ID

  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchWorker();
  }, [id]);

  const fetchWorker = async () => {
    try {
      const data = await api.getWorker(id);
      setWorker(data);
      setFormData(data);
    } catch (error) {
      console.error("Error fetching worker:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const workerData = {
        ...formData,
        skills: Array.isArray(formData.skills)
          ? formData.skills
          : formData.skills.split(",").map((skill) => skill.trim()),
        experience: Number(formData.experience),
        salary: Number(formData.salary),
      };
      await api.updateWorker(id, workerData);
      setIsEditing(false);
      fetchWorker();
    } catch (error) {
      console.error("Error updating worker:", error);
    }
  };

  if (!worker) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <Button onClick={() => navigate("/workers")} className="mb-4">
        Back to Workers
      </Button>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={
                    Array.isArray(formData.skills)
                      ? formData.skills.join(", ")
                      : formData.skills
                  }
                  onChange={handleInputChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
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
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        ) : (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="object-cover w-24 h-24 rounded-full"
              />
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {worker.name}
                </h2>
                <p className="text-lg text-gray-600">{worker.role}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p>
                <span className="font-semibold">Skills:</span>{" "}
                {worker.skills.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Experience:</span>{" "}
                {worker.experience} years
              </p>
              <p>
                <span className="font-semibold">Salary:</span> ₹{worker.salary}
                /month
              </p>
              <p>
                <span className="font-semibold">Status:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded ${
                    worker.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {worker.status}
                </span>
              </p>
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => setIsEditing(true)}>Edit Worker</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleWorkerPage;
