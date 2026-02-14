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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/services/api";
import Loader from "@/helper/Loader";
import { getStatusColor, getStatusIcon } from "@/hooks/usePaymentStatus";
import { ADMINICONS } from "@/Icons/AdminIcons";

const SalaryDetails = () => {
  const { id } = useParams();
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [salarydetails, setSalarydetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useNavigate();

  const workerData = salarydetails;
  const worker = workerData?.worker;

  const filteredMonths =
    selectedMonth === "all"
      ? workerData?.months
      : workerData?.months.filter((month) => month.month === selectedMonth);

  const totalStats = {
    totalEarnings: workerData?.months.reduce(
      (acc, month) => acc + month.totalEarnings,
      0,
    ),
    totalPackets: workerData?.months.reduce(
      (acc, month) => acc + month.totalPackets,
      0,
    ),
    paidAmount: workerData?.months
      .filter((m) => m.status === "Paid")
      .reduce((acc, month) => acc + month.totalEarnings, 0),
    pendingAmount: workerData?.months
      .filter((m) => m.status === "Pending")
      .reduce((acc, month) => acc + month.totalEarnings, 0),
  };

  useEffect(() => {
    const fetchWorker = async () => {
      setLoading(true);
      try {
        const salarydetails = await api.getSalaryDetailsByWorker(id);
        // console.log("salarydetails :", salarydetails);
        if (salarydetails) {
          setSalarydetails(salarydetails);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching worker:", err);
      }
    };
    fetchWorker();
  }, [id]);

  if (loading) {
    return <Loader text="Loading Salary details..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">
            Salary Details - {worker?.fullName}
          </h1>
          <p className="text-[#475569]">Worker ID: {worker?.workerId}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => router(-1)}
          className="border-[#7B1E3A] text-[#7B1E3A] hover:bg-[#7B1E3A] hover:text-white"
        >
          <ADMINICONS.ARROWLEFT className="w-4 h-4 mr-2" />
          Back to Salary Management
        </Button>
      </div>

      {/* Worker Information */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-[#1E293B] flex items-center gap-2">
              <ADMINICONS.USER className="w-5 h-5" />
              Worker Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-[#475569]">Full Name</p>
              <p className="font-medium text-[#1E293B]">{worker?.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-[#475569]">Father/Husband Name</p>
              <p className="font-medium text-[#1E293B]">
                {worker?.fatherHusbandName}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#475569]">Phone</p>
              <p className="font-medium text-[#1E293B] flex items-center gap-2">
                <ADMINICONS.PHONE className="w-4 h-4" />
                {worker?.phone}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#475569]">Address</p>
              <p className="font-medium text-[#1E293B] flex items-center gap-2">
                <ADMINICONS.MAPPIN className="w-4 h-4" />
                {worker?.address.village}, {worker?.address.taluka},{" "}
                {worker?.address.district}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#475569]">Skills</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {worker?.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#7B1E3A]/10 text-[#7B1E3A]"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-[#1E293B] flex items-center gap-2">
              <ADMINICONS.CREDITCARD className="w-5 h-5" />
              Bank Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-[#475569]">Account Holder</p>
              <p className="font-medium text-[#1E293B]">
                {worker?.bankDetails?.accountHolderName}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#475569]">Account Number</p>
              <p className="font-medium text-[#1E293B]">
                {worker?.bankDetails?.accountNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#475569]">IFSC Code</p>
              <p className="font-medium text-[#1E293B]">
                {worker?.bankDetails?.ifsc}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#475569]">UPI ID</p>
              <p className="font-medium text-[#1E293B]">
                {worker?.bankDetails?.upiId}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-[#1E293B] flex items-center gap-2">
              <ADMINICONS.TRENDINGUP className="w-5 h-5" />
              Overall Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-[#475569]">Total Earnings</p>
              <p className="text-2xl font-bold text-[#1E293B]">
                ₹{totalStats.totalEarnings?.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#475569]">Total Packets</p>
              <p className="text-xl font-semibold text-[#005B96]">
                {totalStats.totalPackets}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[#475569]">Paid</p>
                <p className="font-semibold text-[#16A34A]">
                  ₹{totalStats?.paidAmount?.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#475569]">Pending</p>
                <p className="font-semibold text-[#DC2626]">
                  ₹{totalStats?.pendingAmount?.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Month Filter */}
      <Card className="border-[#E2E8F0]">
        <CardContent className="px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-[#1E293B]">
              Monthly Salary Details
            </h3>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <ADMINICONS.CALENDAR className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                {workerData?.months
                  ?.slice()
                  .sort((a, b) => new Date(a.month) - new Date(b.month))
                  .map((month) => (
                    <SelectItem key={month._id} value={month.month}>
                      {month.month}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Details */}
      <div className="space-y-6">
        {filteredMonths
          ?.slice() // copy array to avoid mutating state
          .sort((a, b) => new Date(a.month) - new Date(b.month)) // ascending (old → new)
          .map((monthData) => (
            <Card key={monthData._id} className="border-[#E2E8F0]">
              <CardHeader className="px-3 sm:px-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-[#1E293B] flex items-center gap-2">
                    <ADMINICONS.CALENDAR className="w-5 h-5" />
                    {monthData.month}
                  </CardTitle>
                  <div className="flex flex-row-reverse items-center justify-between gap-4 sm:flex-row">
                    <Badge className={getStatusColor(monthData.status)}>
                      {getStatusIcon(monthData.status)}
                      <span className="ml-1">{monthData.status}</span>
                    </Badge>
                    <div className="text-right">
                      <p className="text-sm text-[#475569]">Total Earnings</p>
                      <p className="text-xl font-bold text-[#1E293B] text-center">
                        ₹{monthData.totalEarnings.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="grid grid-cols-3 gap-4 mb-6 md:grid-cols-3">
                  <div className="items-center justify-center gap-4 p-4 bg-[#F8FAFC] rounded-lg flex sm:flex-row flex-col">
                    <ADMINICONS.PACKAGE className="h-8 w-8 text-[#7B1E3A]" />
                    <div>
                      <p className="text-2xl font-bold text-[#1E293B]">
                        {monthData.totalPackets}
                      </p>
                      <p className="text-sm text-[#475569]">Total Packets</p>
                    </div>
                  </div>
                  <div className="items-center justify-center gap-4 p-4 bg-[#F8FAFC] rounded-lg flex sm:flex-row flex-col">
                    <ADMINICONS.DOLLARSIGN className="h-8 w-8 text-[#EFB700]" />
                    <div>
                      <p className="text-2xl font-bold text-[#1E293B]">
                        ₹{monthData.totalEarnings.toLocaleString()}
                      </p>
                      <p className="text-sm text-[#475569]">Total Earnings</p>
                    </div>
                  </div>
                  <div className="items-center justify-center gap-4 p-4 bg-[#F8FAFC] rounded-lg flex sm:flex-row flex-col">
                    <ADMINICONS.TRENDINGUP className="h-8 w-8 text-[#005B96]" />
                    <div>
                      <p className="text-2xl font-bold text-[#1E293B]">
                        ₹
                        {Math.round(
                          monthData.totalEarnings / monthData.totalPackets,
                        )}
                      </p>
                      <p className="text-sm text-[#475569]">Avg. per Packet</p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead className="text-center">Packets</TableHead>
                        <TableHead className="text-center">Rate</TableHead>
                        <TableHead className="text-right">
                          Total Earnings
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthData.productSummary.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell>
                            <div className="font-medium text-[#1E293B]">
                              {product.productName}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant="outline"
                              className="border-[#7B1E3A] text-[#7B1E3A]"
                            >
                              {product.packets}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-[#475569]">
                              ₹
                              {Math.round(
                                product.totalEarnings / product.packets,
                              )}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="font-semibold text-[#1E293B]">
                              ₹{product.totalEarnings.toLocaleString()}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SalaryDetails;
