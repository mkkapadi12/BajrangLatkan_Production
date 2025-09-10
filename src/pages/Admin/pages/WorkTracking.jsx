import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/services/api";
import { ADMINICONS } from "@/Icons/AdminIcons";
import { getStatusColor } from "@/hooks/useStatusColor";
import { useNavigate } from "react-router-dom";
import { Workerfilters } from "../components/Workerfilters";
import { workerstatusItem } from "@/constant";

export function WorkTracking() {
  const [workers, setWorkers] = useState([]);
  const [metaData, setMetaData] = useState({ totalWorkers: 0, count: 0 });
  const [loading, setLoading] = useState(false);
  // Filters
  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [gender, setGender] = useState("all");
  const [status, setStatus] = useState("all");
  const [phone, setPhone] = useState("");

  const router = useNavigate();

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

  const handleViewWorkDetails = (workerId) => {
    router(`/admin/work-tracking/${workerId}`);
  };

  useEffect(() => {
    fetchWorkers();
  }, [name, village, gender, phone, status]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E293B] mb-2">
          Work Tracking
        </h1>
        <p className="text-[#475569]">
          Monitor and manage all assigned work tasks
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#1E293B]">2</p>
              <p className="text-sm text-[#475569]">Total Tasks</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#94A3B8]">3</p>
              <p className="text-sm text-[#475569]">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#005B96]">4</p>
              <p className="text-sm text-[#475569]">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#EFB700]">1</p>
              <p className="text-sm text-[#475569]">Review</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#16A34A]">7</p>
              <p className="text-sm text-[#475569]">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#DC2626]">2</p>
              <p className="text-sm text-[#475569]">Overdue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}

      <Workerfilters
        name={name}
        setName={setName}
        village={village}
        setVillage={setVillage}
        gender={gender}
        setGender={setGender}
        phone={phone}
        setPhone={setPhone}
        status={status}
        setStatus={setStatus}
        statusItem={workerstatusItem}
      />

      {/* Table */}
      <Card className="border-l-4 ">
        <CardHeader>
          <CardTitle>Worker Work</CardTitle>
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
                              onClick={() => handleViewWorkDetails(worker._id)}
                            >
                              <ADMINICONS.EYE className="w-4 h-4 mr-2" />
                              View Work
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
