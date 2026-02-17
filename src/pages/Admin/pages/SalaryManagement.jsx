import React, { useEffect, useState } from "react";
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
import { ADMINICONS } from "@/Icons/AdminIcons";
import { Workerfilters } from "../components/Workerfilters";
import { salarystatusItem } from "@/constant";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "@/services/api";
import { usePaymentDialog } from "@/hooks/usePaymentDialog";

export function SalaryManagement() {
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentNotes, setPaymentNotes] = useState("");
  //
  const [loading, setLoading] = useState(false);
  const [salaries, setSalaries] = useState([]);

  const navigate = useNavigate();

  //filters state

  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [gender, setGender] = useState("all");
  const [status, setStatus] = useState("all");
  const [phone, setPhone] = useState("");

  // Create filtered salaries based on filter state
  const filteredSalaries = salaries.filter((salary) => {
    const worker = salary.worker || {};

    // Name filter
    const matchName = name
      ? worker.fullName?.toLowerCase().includes(name.toLowerCase())
      : true;

    // Village filter
    const matchVillage = village
      ? worker.address?.village?.toLowerCase().includes(village.toLowerCase())
      : true;

    // Gender filter
    const matchGender = gender !== "all" ? worker.gender === gender : true;

    // Phone filter
    const matchPhone = phone
      ? worker.phone?.toString().includes(phone.toString())
      : true;

    // Status filter (we check the monthData status)
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    const monthData = salary.months.find((m) => m.month === currentMonth);

    const matchStatus =
      status !== "all"
        ? monthData?.status?.toLowerCase() === status.toLowerCase()
        : true;

    return (
      matchName && matchVillage && matchGender && matchPhone && matchStatus
    );
  });

  const fetchWorkerSalaries = async () => {
    setLoading(true);
    try {
      const salarydetails = await api.getSalaryDetails();
      setSalaries(salarydetails);
    } catch (err) {
      console.error("Error fetching Salary", err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSalaryTotals = (data) => {
    return data.reduce(
      (acc, workerSalary) => {
        workerSalary.months.forEach((month) => {
          acc.totalEarnings += month.totalEarnings;

          if (month.status === "Paid") {
            acc.paidAmount += month.totalEarnings;
          }

          if (month.status === "Pending") {
            acc.pendingAmount += month.totalEarnings;
          }
        });

        acc.totalWorker += 1; // ✅ count worker once

        return acc;
      },
      {
        totalEarnings: 0,
        paidAmount: 0,
        pendingAmount: 0,
        totalWorker: 0,
      },
    );
  };

  const totals = getSalaryTotals(salaries);

  // console.log(totals);

  const handleViewDetails = (id) => {
    // console.log("Id : ", id);
    navigate(`/admin/salary/${id}`);
  };

  useEffect(() => {
    fetchWorkerSalaries();
  }, []);

  // 🔥 API call here
  const handlePaySalary = async ({ salary, paymentMethod, paymentNotes }) => {
    try {
      const payload = {
        workerId: salary.worker._id,
        month: salary.monthData.month,
        paymentMethod,
        paymentNotes,
      };

      await api.payMonthlySalary(payload);

      toast.success("Salary paid successfully");

      // 🔄 Refresh salary details after payment
      fetchWorkerSalaries();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Payment failed");
      throw error; // IMPORTANT
    }
  };

  const { openDialog, PaymentDialog } = usePaymentDialog({
    onPay: handlePaySalary,
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">
            Salary & Payment Management
          </h1>
          <p className="text-[#475569]">
            Manage worker salaries and process payments
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-[#7B1E3A] text-[#7B1E3A] hover:bg-[#7B1E3A] hover:text-white bg-transparent"
          >
            <ADMINICONS.DOWNLOAD className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-[#7B1E3A] hover:bg-[#7B1E3A]/90 text-white">
            <ADMINICONS.TRENDINGUP className="w-4 h-4 mr-2" />
            Calculate Salaries
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="border-[#E2E8F0] py-2 sm:py-4">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">
                  Total Workers
                </p>
                <p className="text-2xl font-bold text-[#1E293B]">
                  {totals?.totalWorker}
                </p>
              </div>
              <ADMINICONS.USER className="h-8 w-8 text-[#7B1E3A]" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0] py-2 sm:py-4">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">
                  Pending Payments
                </p>
                <p className="text-2xl font-bold text-[#DC2626]">
                  ₹{totals?.pendingAmount}
                </p>
              </div>
              <div className="w-8 h-8 bg-[#DC2626]/10 rounded-lg flex items-center justify-center">
                <ADMINICONS.INDIANRUPEE className="h-5 w-5 text-[#DC2626]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0] py-2 sm:py-4">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">Processing</p>
                <p className="text-2xl font-bold text-[#EFB700]">
                  ₹{totals?.processing || "N/A"}
                </p>
              </div>
              <div className="w-8 h-8 bg-[#EFB700]/10 rounded-lg flex items-center justify-center">
                <ADMINICONS.CREDITCARD className="h-5 w-5 text-[#EFB700]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0] py-2 sm:py-4">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">
                  Paid Payments
                </p>
                <p className="text-2xl font-bold text-[#16A34A]">
                  ₹{totals?.paidAmount}
                </p>
              </div>
              <div className="w-8 h-8 bg-[#16A34A]/10 rounded-lg flex items-center justify-center">
                <ADMINICONS.CHECKCIRCLE className="h-5 w-5 text-[#16A34A]" />
              </div>
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
        statusItem={salarystatusItem}
      />

      <Card className="border border-gray-200 shadow-sm rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <ADMINICONS.DOLLARSIGN className="w-6 h-6 text-bajrang-brand" />
            Salary Records
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className=" bg-gray-50">
                  <TableHead className="py-3 text-gray-700">Worker</TableHead>
                  <TableHead className="py-3 text-gray-700">Phone</TableHead>
                  <TableHead className="py-3 text-gray-700">Month</TableHead>
                  <TableHead className="py-3 text-center text-gray-700">
                    Total Packets
                  </TableHead>
                  <TableHead className="py-3 text-center text-gray-700">
                    Total Earnings
                  </TableHead>
                  <TableHead className="py-3 text-center text-gray-700">
                    Status
                  </TableHead>
                  <TableHead className="py-3 text-right text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredSalaries.length > 0 ? (
                  filteredSalaries?.map((salary) => {
                    const currentMonth = new Date().toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    });

                    const monthData = salary.months.find(
                      (m) => m.month === currentMonth,
                    );
                    if (!monthData) return null;

                    return (
                      <TableRow
                        key={salary._id}
                        className="transition-colors hover:bg-gray-50"
                      >
                        {/* Worker Info */}
                        <TableCell className="py-4">
                          <div>
                            <p className="font-semibold text-gray-800">
                              {salary.worker.fullName}
                            </p>
                            <p className="sm:block hidden text-xs text-gray-500">
                              ID: {salary.worker.workerId}
                            </p>
                          </div>
                        </TableCell>

                        {/* Village */}
                        <TableCell className="py-4 text-gray-700">
                          {salary.worker.phone || "N/A"}
                        </TableCell>

                        {/* Month */}
                        <TableCell className="py-4 text-gray-700">
                          {monthData.month}
                        </TableCell>

                        {/* Total Packets */}
                        <TableCell className="py-4 font-medium text-center text-gray-700">
                          {monthData.totalPackets}
                        </TableCell>

                        {/* Total Earnings */}
                        <TableCell className="py-4 text-center">
                          <span className="text-lg font-bold text-center text-bajrang-brand">
                            ₹{monthData.totalEarnings.toLocaleString()}
                          </span>
                        </TableCell>

                        {/* Status */}
                        <TableCell className="py-4 text-center">
                          <Badge
                            className={`px-3 py-1 text-xs rounded-full ${
                              monthData.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {monthData.status}
                          </Badge>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="w-8 h-8 p-0 rounded-full hover:bg-gray-100"
                              >
                                <ADMINICONS.MOREHORIZONTAL className="w-5 h-5 text-gray-600" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="rounded-lg shadow-lg"
                            >
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleViewDetails(salary.worker._id)
                                }
                              >
                                <ADMINICONS.EYE className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ADMINICONS.DOWNLOAD className="w-4 h-4 mr-2" />
                                Download Slip
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {monthData.status === "Pending" && (
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault(); // ⬅️ VERY IMPORTANT
                                    openDialog({
                                      worker: salary.worker,
                                      monthData,
                                    });
                                  }}
                                >
                                  <ADMINICONS.CHECKCIRCLE className="w-4 h-4 mr-2" />
                                  Process Payment
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <>
                    <TableRow>
                      <TableCell colSpan={7} className="py-10 text-center">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <div className="flex items-center justify-center bg-gray-100 rounded-full w-14 h-14">
                            <ADMINICONS.SEARCH className="text-gray-400 w-7 h-7" />
                          </div>
                          <h3 className="text-base font-semibold text-gray-700">
                            No salary records found
                          </h3>
                          <p className="text-sm text-gray-500">
                            Try adjusting your filters or check back later.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Processing Dialog */}
      <PaymentDialog />
    </div>
  );
}
