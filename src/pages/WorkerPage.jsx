import React, { useEffect, useState } from "react";
import { Users, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { api } from "@/services/api";
import Modal from "@/components/ui/Modal";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";

export default function WorkersPage() {
  useDocumentTitle("Bajrang Latkan - Manage Our Skilled Workers and Craftsmen");
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
    status: "",
    avatar: "https://placehold.co/100",
  });

  const navigate = useNavigate();

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
    console.log(`Filter changed: ${name} = ${value}`);

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
        status: "",
        avatar: "https://placehold.co/100",
      });
      fetchWorkers();
    } catch (error) {
      console.error("Error adding worker:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Hero Section */}
      <section className="py-20 text-white bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Our <span className="text-yellow-300">Workers</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-purple-100">
              Meet our skilled craftsmen and team members who bring our latkans
              to life
            </p>
          </div>
        </div>
      </section>

      {/* Workers Management */}
      <section className="bg-white sm:p-5 md:p-10 lg:p-15">
        <div className="container p-4 mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center justify-between mb-8 md:flex-row">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:mb-0">
              Workers Management
            </h2>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Worker
            </Button>
          </div>

          {/* Filters */}
          <div className="grid gap-4 mb-8 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <Input
                type="text"
                name="name"
                onChange={handleFilterChange}
                value={filters.name}
                placeholder="Filter by name..."
                className="pl-10"
              />
            </div>
            <Input
              type="text"
              name="role"
              onChange={handleFilterChange}
              value={filters.role}
              placeholder="Filter by role..."
            />

            {/* Status Filter */}
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="!w-full">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Training">Training</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By Filter */}
            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, sortBy: value }))
              }
            >
              <SelectTrigger className="!w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">None</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="experience-asc">Experience-Asc</SelectItem>
                <SelectItem value="experience-desc">Experience-Desc</SelectItem>
                <SelectItem value="salary-asc">Salary-Asc</SelectItem>
                <SelectItem value="salary-desc">Salary-Desc</SelectItem>
                <SelectItem value="role">Role</SelectItem>
              </SelectContent>
            </Select>
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
                <Input
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
                <Input
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
                <Input
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
                <Input
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
                <Input
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
                <Select
                  name="status"
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <SelectTrigger className="!w-full">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end mt-6 space-x-3">
                <Button
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Worker</Button>
              </div>
            </form>
          </Modal>

          {/* Workers Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workers.map((worker) => (
              <Card
                key={worker._id}
                className="transition-shadow border-purple-100 hover:shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="font-semibold text-purple-600 bg-purple-100">
                        {worker.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{worker.name}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {worker.role}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        worker.status === "Active" ? "default" : "secondary"
                      }
                      className={
                        worker.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {worker.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Skills:{" "}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {worker.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Experience:{" "}
                      </span>
                      <span className="text-sm text-gray-600">
                        {worker.experience} years
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-bold text-purple-600">
                        ₹{worker.salary}/month
                      </span>
                      <div className="space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/workers/${worker._id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-purple-50 sm:px-10 md:px-15 lg:px-20">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Workforce Statistics
            </h2>
            <p className="text-xl text-gray-600">
              Overview of our team performance and metrics
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            <Card className="text-center border-purple-100">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <CardTitle className="text-3xl font-bold text-purple-600">
                  24
                </CardTitle>
                <CardDescription>Total Workers</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-purple-100">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
                  <span className="font-bold text-green-600">22</span>
                </div>
                <CardTitle className="text-3xl font-bold text-green-600">
                  22
                </CardTitle>
                <CardDescription>Active Workers</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-purple-100">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-yellow-100 rounded-full">
                  <span className="font-bold text-yellow-600">2</span>
                </div>
                <CardTitle className="text-3xl font-bold text-yellow-600">
                  2
                </CardTitle>
                <CardDescription>In Training</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-purple-100">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full">
                  <span className="font-bold text-blue-600">2.5</span>
                </div>
                <CardTitle className="text-3xl font-bold text-blue-600">
                  2.5
                </CardTitle>
                <CardDescription>Avg Experience (Years)</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
