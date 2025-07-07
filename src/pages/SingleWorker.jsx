import React, { useState } from "react";
import {
  ArrowLeft,
  Edit,
  Save,
  X,
  User,
  Briefcase,
  DollarSign,
  Calendar,
  Award,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Mock data - in real app, this would come from API/database
const getWorkerData = (id) => {
  const workers = {
    1: {
      id: "1",
      name: "Mayur Kapadi",
      role: "Hodi Maker",
      email: "mayur.kapadi@bajranglatkan.com",
      phone: "+91 98765 43210",
      address: "123 Craft Street, Mumbai, Maharashtra 400001",
      dateOfBirth: "1990-05-15",
      joiningDate: "2022-03-01",
      skills: ["Hodi", "Spring", "Traditional"],
      experience: "2 years",
      salary: "8500",
      status: "Active",
      avatar: "MK",
      emergencyContact: {
        name: "Sunita Kapadi",
        relation: "Wife",
        phone: "+91 98765 43211",
      },
      performance: {
        productivity: 85,
        quality: 92,
        attendance: 96,
        teamwork: 88,
      },
      projects: [
        {
          name: "Festival Collection 2024",
          status: "Completed",
          contribution: "Lead Maker",
        },
        {
          name: "Wedding Special Series",
          status: "In Progress",
          contribution: "Senior Maker",
        },
        {
          name: "Traditional Hodi Revival",
          status: "Completed",
          contribution: "Design Consultant",
        },
      ],
      notes:
        "Excellent craftsman with strong attention to detail. Shows great leadership potential and mentors junior workers effectively.",
    },
  };
  return workers[id] || null;
};

export default function WorkerDetailPage() {
  const worker = getWorkerData(1);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(worker || {});

  if (!worker) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-white">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Worker Not Found
          </h1>
          <Link to="/workers">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Workers
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    // In real app, this would save to API/database
    console.log("Saving worker data:", formData);
    setIsEditing(false);
    // Show success message
    alert("Worker details updated successfully!");
  };

  const handleCancel = () => {
    setFormData(worker);
    setIsEditing(false);
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateNestedFormData = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <section className="py-12 text-white bg-gradient-to-r from-purple-600 to-purple-800 sm:px-5 md:px-9 lg:px-12">
        <div className="container px-4 mx-auto">
          <Link to="/workers" className="inline-flex items-center mb-6">
            <Button
              variant="ghost"
              className="text-white hover:bg-purple-700 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Workers
            </Button>
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-xl font-bold text-purple-800 bg-yellow-300">
                    {formData.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold">{formData.name}</h1>
                  <p className="text-lg text-purple-100">{formData.role}</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="text-white bg-transparent border-white hover:bg-white hover:text-purple-800"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="text-black bg-yellow-500 hover:bg-yellow-600"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Details
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:px-5 md:px-9 lg:px-12">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Personal Information */}
            <div className="space-y-6 lg:col-span-2">
              {/* Basic Information */}
              <Card className="border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl font-semibold">
                    <User className="w-5 h-5 mr-2 text-purple-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            updateFormData("name", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-gray-900">{formData.name}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      {isEditing ? (
                        <Select
                          value={formData.role}
                          onValueChange={(value) =>
                            updateFormData("role", value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Hodi Maker">
                              Hodi Maker
                            </SelectItem>
                            <SelectItem value="Spring Maker">
                              Spring Maker
                            </SelectItem>
                            <SelectItem value="Designer">Designer</SelectItem>
                            <SelectItem value="Quality Controller">
                              Quality Controller
                            </SelectItem>
                            <SelectItem value="Packaging Specialist">
                              Packaging Specialist
                            </SelectItem>
                            <SelectItem value="Traditional Maker">
                              Traditional Maker
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-gray-900">{formData.role}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            updateFormData("email", e.target.value)
                          }
                        />
                      ) : (
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <p className="text-gray-900">{formData.email}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            updateFormData("phone", e.target.value)
                          }
                        />
                      ) : (
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <p className="text-gray-900">{formData.phone}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    {isEditing ? (
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          updateFormData("address", e.target.value)
                        }
                        rows={2}
                      />
                    ) : (
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 mt-1 mr-2 text-gray-400" />
                        <p className="text-gray-900">{formData.address}</p>
                      </div>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      {isEditing ? (
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) =>
                            updateFormData("dateOfBirth", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-gray-900">
                          {new Date(formData.dateOfBirth).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="joiningDate">Joining Date</Label>
                      {isEditing ? (
                        <Input
                          id="joiningDate"
                          type="date"
                          value={formData.joiningDate}
                          onChange={(e) =>
                            updateFormData("joiningDate", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-gray-900">
                          {new Date(formData.joiningDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Information */}
              <Card className="border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center justify-start text-2xl font-semibold">
                    <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
                    Professional Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="experience">Experience</Label>
                      {isEditing ? (
                        <Input
                          id="experience"
                          value={formData.experience}
                          onChange={(e) =>
                            updateFormData("experience", e.target.value)
                          }
                        />
                      ) : (
                        <p className="font-medium text-gray-900">
                          {formData.experience}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      {isEditing ? (
                        <Select
                          value={formData.status}
                          onValueChange={(value) =>
                            updateFormData("status", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Training">Training</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                            <SelectItem value="On Leave">On Leave</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge
                          variant={
                            formData.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            formData.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {formData.status}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label>Skills</Label>
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input
                          placeholder="Add skills separated by commas"
                          value={formData.skills?.join(", ") || ""}
                          onChange={(e) =>
                            updateFormData(
                              "skills",
                              e.target.value.split(", ").filter((s) => s.trim())
                            )
                          }
                        />
                        <p className="text-sm text-gray-500">
                          Separate skills with commas
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {formData.skills?.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-purple-700 bg-purple-50"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    {isEditing ? (
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) =>
                          updateFormData("notes", e.target.value)
                        }
                        rows={3}
                        placeholder="Add any additional notes about the worker..."
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{formData.notes}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Salary & Performance */}
            <div className="space-y-6">
              {/* Salary Information */}
              <Card className="border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
                    Salary Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    {isEditing ? (
                      <div className="space-y-2">
                        <Label htmlFor="salary">Monthly Salary (₹)</Label>
                        <Input
                          id="salary"
                          type="number"
                          value={formData.salary}
                          onChange={(e) =>
                            updateFormData("salary", e.target.value)
                          }
                        />
                      </div>
                    ) : (
                      <>
                        <div className="mb-2 text-3xl font-bold text-purple-600">
                          ₹{formData.salary}
                        </div>
                        <p className="text-gray-600">per month</p>
                      </>
                    )}
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Salary:</span>
                      <span className="font-medium">
                        ₹
                        {(
                          Number.parseInt(formData.salary) * 12
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Increment:</span>
                      <span className="font-medium">Jan 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Review:</span>
                      <span className="font-medium">Jan 2025</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-purple-600" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(formData.performance || {}).map(
                    ([key, value]) => (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium capitalize">
                            {key}
                          </span>
                          <span className="text-sm font-bold">{value}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div
                            className={`h-2 rounded-full ${
                              value >= 90
                                ? "bg-green-500"
                                : value >= 70
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
