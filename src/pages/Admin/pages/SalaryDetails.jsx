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
import {
  ArrowLeft,
  DollarSign,
  Calendar,
  Package,
  TrendingUp,
  User,
  MapPin,
  Phone,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/services/api";
import Loader from "@/helper/Loader";

// Mock data based on the provided structure
const mockWorkerSalaryData = {
  _id: "68bc0481af04fb854a93c700",
  worker: {
    address: {
      village: "Sukhpur",
      taluka: "Visavadar",
      district: "Junagadh",
    },
    emergencyContact: {
      name: "Ronak Kapadi",
      phone: "9714170940",
    },
    bankDetails: {
      accountHolderName: "MAYUR KALIDAS KAPADI",
      accountNumber: "9979274398799",
      ifsc: "HDFC000123",
      upiId: "9727434078@paytm",
    },
    _id: "68b8814d871fa3659ba06cf0",
    fullName: "Mayur Kapadi",
    fatherHusbandName: "Kalidas Kapadi",
    dateOfBirth: "2005-03-24T00:00:00.000Z",
    gender: "Male",
    photo: "",
    phone: "9727434078",
    alternatePhone: "",
    skills: ["Beads", "Threading"],
    workPreference: "Full-time",
    experience: 1,
    notes: "",
    email: "mayurkapadi12@gmail.com",
    status: "Active",
    dateOfJoining: "2025-09-03T17:56:29.788Z",
    workerId: "WORKER01",
  },
  months: [
    {
      status: "Pending",
      month: "September 2025",
      totalPackets: 278,
      productSummary: [
        {
          productName: "Hodi",
          packets: 80,
          totalEarnings: 560,
          _id: "68c15de4fa132eeca385d674",
        },
        {
          productName: "Fancy",
          packets: 63,
          totalEarnings: 756,
          _id: "68c15de4fa132eeca385d675",
        },
        {
          productName: "NewProduct",
          packets: 10,
          totalEarnings: 150,
          _id: "68c15de4fa132eeca385d676",
        },
        {
          productName: "Fancy Latkan",
          packets: 67,
          totalEarnings: 670,
          _id: "68c15de4fa132eeca385d677",
        },
        {
          productName: "Spring Latkan",
          packets: 34,
          totalEarnings: 204,
          _id: "68c15de4fa132eeca385d678",
        },
        {
          productName: "Hodi Latkan",
          packets: 12,
          totalEarnings: 84,
          _id: "68c15de4fa132eeca385d679",
        },
        {
          productName: "Thingali Latkan",
          packets: 12,
          totalEarnings: 420,
          _id: "68c15de4fa132eeca385d67a",
        },
      ],
      totalEarnings: 2844,
      _id: "68bc0481af04fb854a93c702",
    },
    {
      status: "Paid",
      month: "October 2025",
      totalPackets: 74,
      productSummary: [
        {
          productName: "Hodi",
          packets: 14,
          totalEarnings: 98,
          _id: "68bc05fcaf04fb854a93c722",
        },
        {
          productName: "Fancy",
          packets: 20,
          totalEarnings: 240,
          _id: "68bc05fcaf04fb854a93c723",
        },
        {
          productName: "spring",
          packets: 40,
          totalEarnings: 240,
          _id: "68bc05fcaf04fb854a93c724",
        },
      ],
      totalEarnings: 578,
      _id: "68bc05fcaf04fb854a93c721",
    },
    {
      status: "Processing",
      month: "August 2025",
      totalPackets: 156,
      productSummary: [
        {
          productName: "Hodi",
          packets: 45,
          totalEarnings: 315,
          _id: "68bc05fcaf04fb854a93c725",
        },
        {
          productName: "Fancy Latkan",
          packets: 78,
          totalEarnings: 780,
          _id: "68bc05fcaf04fb854a93c726",
        },
        {
          productName: "Spring Latkan",
          packets: 33,
          totalEarnings: 198,
          _id: "68bc05fcaf04fb854a93c727",
        },
      ],
      totalEarnings: 1293,
      _id: "68bc05fcaf04fb854a93c728",
    },
  ],
};

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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-[#16A34A] text-white";
      case "processing":
        return "bg-[#EFB700] text-white";
      case "pending":
        return "bg-[#DC2626] text-white";
      default:
        return "bg-[#94A3B8] text-white";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const totalStats = {
    totalEarnings: workerData?.months.reduce(
      (acc, month) => acc + month.totalEarnings,
      0
    ),
    totalPackets: workerData?.months.reduce(
      (acc, month) => acc + month.totalPackets,
      0
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
        console.log("salarydetails :", salarydetails);
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
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Salary Management
        </Button>
      </div>

      {/* Worker Information */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-[#1E293B] flex items-center gap-2">
              <User className="w-5 h-5" />
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
                <Phone className="w-4 h-4" />
                {worker?.phone}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#475569]">Address</p>
              <p className="font-medium text-[#1E293B] flex items-center gap-2">
                <MapPin className="w-4 h-4" />
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
              <CreditCard className="w-5 h-5" />
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
              <TrendingUp className="w-5 h-5" />
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
                <Calendar className="w-4 h-4 mr-2" />
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
                    <Calendar className="w-5 h-5" />
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
                    <Package className="h-8 w-8 text-[#7B1E3A]" />
                    <div>
                      <p className="text-2xl font-bold text-[#1E293B]">
                        {monthData.totalPackets}
                      </p>
                      <p className="text-sm text-[#475569]">Total Packets</p>
                    </div>
                  </div>
                  <div className="items-center justify-center gap-4 p-4 bg-[#F8FAFC] rounded-lg flex sm:flex-row flex-col">
                    <DollarSign className="h-8 w-8 text-[#EFB700]" />
                    <div>
                      <p className="text-2xl font-bold text-[#1E293B]">
                        ₹{monthData.totalEarnings.toLocaleString()}
                      </p>
                      <p className="text-sm text-[#475569]">Total Earnings</p>
                    </div>
                  </div>
                  <div className="items-center justify-center gap-4 p-4 bg-[#F8FAFC] rounded-lg flex sm:flex-row flex-col">
                    <TrendingUp className="h-8 w-8 text-[#005B96]" />
                    <div>
                      <p className="text-2xl font-bold text-[#1E293B]">
                        ₹
                        {Math.round(
                          monthData.totalEarnings / monthData.totalPackets
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
                        <TableHead className="text-center">
                          Rate
                        </TableHead>
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
                                product.totalEarnings / product.packets
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
