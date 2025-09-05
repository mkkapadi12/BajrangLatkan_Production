import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Phone,
  MapPin,
  Calendar,
  Star,
} from "lucide-react";

const mockWorkers = [
  {
    id: "1",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    address: "Sector 15, Chandigarh",
    skills: ["Traditional Latkans", "Designer Work"],
    salaryRate: 15,
    joinDate: "2023-01-15",
    status: "active",
    completedTasks: 145,
    rating: 4.8,
    currentWork: "500 Traditional Latkans for Rajesh Textiles",
  },
  {
    id: "2",
    name: "Priya Sharma",
    phone: "+91 87654 32109",
    address: "Model Town, Ludhiana",
    skills: ["Festival Special", "Custom Orders"],
    salaryRate: 18,
    joinDate: "2023-03-20",
    status: "active",
    completedTasks: 98,
    rating: 4.6,
    currentWork: "200 Designer Latkans for Sharma Exports",
  },
  {
    id: "3",
    name: "Amit Patel",
    phone: "+91 76543 21098",
    address: "Civil Lines, Jalandhar",
    skills: ["Traditional Latkans", "Quality Control"],
    salaryRate: 12,
    joinDate: "2023-06-10",
    status: "on-leave",
    completedTasks: 67,
    rating: 4.2,
  },
  {
    id: "4",
    name: "Sunita Devi",
    phone: "+91 65432 10987",
    address: "Sarabha Nagar, Ludhiana",
    skills: ["Designer Work", "Beadwork"],
    salaryRate: 20,
    joinDate: "2022-11-05",
    status: "active",
    completedTasks: 203,
    rating: 4.9,
  },
  {
    id: "5",
    name: "Ravi Singh",
    phone: "+91 54321 09876",
    address: "Urban Estate, Patiala",
    skills: ["Traditional Latkans"],
    salaryRate: 10,
    joinDate: "2024-01-08",
    status: "inactive",
    completedTasks: 23,
    rating: 3.8,
  },
];

export function WorkersManagement() {
  const [workers, setWorkers] = useState(mockWorkers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch =
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.phone.includes(searchTerm) ||
      worker.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" || worker.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-[#16A34A] text-white";
      case "inactive":
        return "bg-[#94A3B8] text-white";
      case "on-leave":
        return "bg-[#EFB700] text-white";
      default:
        return "bg-[#94A3B8] text-white";
    }
  };

  const handleAddWorker = (formData) => {
    const newWorker = {
      id: Date.now().toString(),
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      skills: formData
        .get("skills")
        .split(",")
        .map((s) => s.trim()),
      salaryRate: Number(formData.get("salaryRate")),
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
      completedTasks: 0,
      rating: 0,
    };
    setWorkers([...workers, newWorker]);
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">
            Workers Management
          </h1>
          <p className="text-[#475569]">
            Manage your workforce and track their performance
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#7B1E3A] hover:bg-[#7B1E3A]/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Worker
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form action={handleAddWorker}>
              <DialogHeader>
                <DialogTitle>Add New Worker</DialogTitle>
                <DialogDescription>
                  Enter the details of the new worker to add them to your team.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="skills" className="text-right">
                    Skills
                  </Label>
                  <Input
                    id="skills"
                    name="skills"
                    placeholder="Traditional Latkans, Designer Work"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="salaryRate" className="text-right">
                    Rate (₹/item)
                  </Label>
                  <Input
                    id="salaryRate"
                    name="salaryRate"
                    type="number"
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-[#7B1E3A] hover:bg-[#7B1E3A]/90"
                >
                  Add Worker
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">
                  Total Workers
                </p>
                <p className="text-2xl font-bold text-[#1E293B]">
                  {workers.length}
                </p>
              </div>
              <Users className="h-8 w-8 text-[#7B1E3A]" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">
                  Active Workers
                </p>
                <p className="text-2xl font-bold text-[#1E293B]">
                  {workers.filter((w) => w.status === "active").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-[#16A34A]/10 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-[#16A34A] rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">On Leave</p>
                <p className="text-2xl font-bold text-[#1E293B]">
                  {workers.filter((w) => w.status === "on-leave").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-[#EFB700]/10 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-[#EFB700] rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">Avg Rating</p>
                <p className="text-2xl font-bold text-[#1E293B]">
                  {(
                    workers.reduce((acc, w) => acc + w.rating, 0) /
                    workers.length
                  ).toFixed(1)}
                </p>
              </div>
              <Star className="h-8 w-8 text-[#EFB700]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-[#E2E8F0]">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] h-4 w-4" />
              <Input
                placeholder="Search workers by name, phone, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Workers Table */}
      <Card className="border-[#E2E8F0]">
        <CardHeader>
          <CardTitle className="text-[#1E293B]">Workers List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Worker</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Current Work</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkers.map((worker) => (
                  <TableRow key={worker.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-[#1E293B]">
                          {worker.name}
                        </p>
                        <p className="text-sm text-[#475569] flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Joined{" "}
                          {new Date(worker.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="flex items-center gap-1 text-sm">
                          <Phone className="w-3 h-3" />
                          {worker.phone}
                        </p>
                        <p className="text-sm text-[#475569] flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {worker.address}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {worker.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        ₹{worker.salaryRate}/item
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(worker.status)}>
                        {worker.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">
                          {worker.completedTasks} tasks
                        </p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-[#EFB700] text-[#EFB700]" />
                          <span className="text-sm">{worker.rating}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-[#475569] max-w-[200px] truncate">
                        {worker.currentWork || "No active work"}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="w-8 h-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Worker
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Worker
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
