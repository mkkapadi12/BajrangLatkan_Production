import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { api } from "@/services/api";
import { getStatusColor } from "@/hooks/useStatusColor";
import { ADMINICONS } from "@/Icons/AdminIcons";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

export function WorkersManagement() {
  const [workers, setWorkers] = useState([]);
  const [metaData, setMetaData] = useState({ totalWorkers: 0, count: 0 });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Filters
  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [gender, setGender] = useState("all");
  const [status, setStatus] = useState("all");
  const [phone, setPhone] = useState("");

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const workersData = await api.getAllWorkers({
        name,
        village,
        gender,
        status,
        phone,
      });
      setWorkers(workersData);
      setMetaData({
        totalWorkers: workersData?.totalWorkers || 0,
        activeWorkers:
          workersData?.data?.filter((w) => w.status === "Active").length || 0,
        inactiveWorkers:
          workersData?.data?.filter((w) => w.status === "Inactive").length || 0,
      });
    } catch (err) {
      console.error("Error fetching workers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (id) => {
    console.log("Id : ", id);
    navigate(`/admin/workers/${id}`);
  };

  useEffect(() => {
    fetchWorkers();
  }, [name, village, gender, phone, status]);

  console.log("workers :", workers);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1E293B]">
          Workers Management
        </h1>
      </div>
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Total Workers */}
        {[
          {
            text: "Total Workers",
            class: "border-l-4 border-blue-500 shadow-lg",
            icon: ADMINICONS.USERS,
            color: "blue",
            data: metaData?.totalWorkers,
          },
          {
            text: "Active Workers",
            class: "border-l-4 border-green-500 shadow-lg",
            icon: ADMINICONS.CHECKCIRCLE,
            color: "green",
            data: metaData?.activeWorkers,
          },
          {
            text: "Inactive Workers",
            class: "border-l-4 border-red-500 shadow-lg",
            icon: ADMINICONS.ALERT,
            color: "red",
            data: metaData?.inactiveWorkers,
          },
        ].map((item, index) => {
          return (
            <Card className={cn(item.class, "py-3")} key={index}>
              <CardContent className="flex items-center justify-between md:p-4">
                <div>
                  <h2 className="text-sm font-medium text-gray-500">
                    {item.text}
                  </h2>
                  <p className={`text-3xl font-bold text-${item.color}-600`}>
                    {item.data}
                  </p>
                </div>
                <div className={`p-3 bg-${item.color}-100 rounded-full`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="py-3 border-l-4 shadow-lg border-bajrang-brand">
        <CardContent className="grid gap-4 md:p-6 sm:grid-cols-5">
          <Input
            placeholder="Search by Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-l-4 border-bajrang-accent"
          />
          <Input
            placeholder="Search by Village..."
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            className="border-l-4 border-bajrang-accent"
          />
          <Input
            type="number"
            placeholder="Search by Phone..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-l-4 border-bajrang-accent"
          />
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className="w-full border-l-4 border-bajrang-accent">
              {/* <ADMINICONS.FILTER className="w-4 h-4 mr-2" /> */}
              <SelectValue placeholder="Filter by Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full border-l-4 border-bajrang-accent">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-l-4 ">
        <CardHeader>
          <CardTitle>Workers List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center">Loading workers...</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Worker</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Village</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workers?.data?.map((worker) => (
                    <TableRow key={worker._id}>
                      <TableCell>
                        <p className="font-medium">{worker?.fullName}</p>
                        <p className="flex items-center gap-1 text-xs text-gray-500">
                          <ADMINICONS.CALENDAR className="w-3 h-3" />
                          Joined{" "}
                          {new Date(worker?.dateOfJoining).toLocaleDateString()}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="flex items-center gap-1 text-sm">
                          <ADMINICONS.PHONE className="w-3 h-3" />{" "}
                          {worker?.phone}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="flex items-center gap-1 text-sm">
                          <ADMINICONS.MAPPIN className="w-3 h-3" />{" "}
                          {worker.address?.village || "-"}
                        </p>
                      </TableCell>
                      <TableCell>{worker.gender}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(worker.status)}>
                          {worker.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-8 h-8 p-0 hover:!bg-bajrang-brand/10 hover:text-bajrang-text"
                            >
                              <ADMINICONS.MOREHORIZONTAL className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuLabel>
                              {worker.workerId}
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => handleViewDetails(worker._id)}
                            >
                              <ADMINICONS.EYE className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ADMINICONS.EDIT className="w-4 h-4 mr-2" />
                              Edit Worker
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <ADMINICONS.TRASH className="w-4 h-4 mr-2" />
                              Delete Worker
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {workers.data?.length === 0 && (
                <p className="mt-4 text-center text-gray-500">
                  No workers found
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
