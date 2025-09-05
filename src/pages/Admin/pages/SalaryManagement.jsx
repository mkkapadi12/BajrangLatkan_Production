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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DollarSign,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  CheckCircle,
  Download,
  Calendar,
  User,
  CreditCard,
  TrendingUp,
} from "lucide-react";

const mockSalaryData = [
  {
    id: "1",
    workerName: "Rajesh Kumar",
    workerId: "W001",
    month: "January",
    year: 2024,
    completedTasks: 8,
    totalItems: 650,
    ratePerItem: 15,
    grossSalary: 9750,
    deductions: 250,
    bonuses: 500,
    overtime: 300,
    netSalary: 10300,
    status: "paid",
    paymentDate: "2024-01-31",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "2",
    workerName: "Priya Sharma",
    workerId: "W002",
    month: "January",
    year: 2024,
    completedTasks: 6,
    totalItems: 480,
    ratePerItem: 18,
    grossSalary: 8640,
    deductions: 200,
    bonuses: 300,
    overtime: 0,
    netSalary: 8740,
    status: "pending",
  },
  {
    id: "3",
    workerName: "Sunita Devi",
    workerId: "W003",
    month: "January",
    year: 2024,
    completedTasks: 10,
    totalItems: 820,
    ratePerItem: 20,
    grossSalary: 16400,
    deductions: 400,
    bonuses: 800,
    overtime: 600,
    netSalary: 17400,
    status: "processing",
  },
  {
    id: "4",
    workerName: "Amit Patel",
    workerId: "W004",
    month: "January",
    year: 2024,
    completedTasks: 4,
    totalItems: 280,
    ratePerItem: 12,
    grossSalary: 3360,
    deductions: 100,
    bonuses: 0,
    overtime: 0,
    netSalary: 3260,
    status: "pending",
  },
];

export function SalaryManagement() {
  const [salaryData, setSalaryData] = useState(mockSalaryData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentNotes, setPaymentNotes] = useState("");

  const filteredSalaryData = salaryData.filter((salary) => {
    const matchesSearch =
      salary.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salary.workerId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || salary.status === statusFilter;
    const matchesMonth = monthFilter === "all" || salary.month === monthFilter;

    return matchesSearch && matchesStatus && matchesMonth;
  });

  const getStatusColor = (status) => {
    switch (status) {
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

  const handleProcessPayment = (salaryId) => {
    setSalaryData((prev) =>
      prev.map((salary) =>
        salary.id === salaryId
          ? {
              ...salary,
              status: "paid",
              paymentDate: new Date().toISOString().split("T")[0],
              paymentMethod,
              notes: paymentNotes,
            }
          : salary
      )
    );
    setIsPaymentDialogOpen(false);
    setPaymentMethod("");
    setPaymentNotes("");
    setSelectedSalary(null);
  };

  const totalStats = {
    totalWorkers: salaryData.length,
    totalPending: salaryData
      .filter((s) => s.status === "pending")
      .reduce((acc, s) => acc + s.netSalary, 0),
    totalPaid: salaryData
      .filter((s) => s.status === "paid")
      .reduce((acc, s) => acc + s.netSalary, 0),
    totalProcessing: salaryData
      .filter((s) => s.status === "processing")
      .reduce((acc, s) => acc + s.netSalary, 0),
  };

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
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-[#7B1E3A] hover:bg-[#7B1E3A]/90 text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            Calculate Salaries
          </Button>
        </div>
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
                  {totalStats.totalWorkers}
                </p>
              </div>
              <User className="h-8 w-8 text-[#7B1E3A]" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">
                  Pending Payments
                </p>
                <p className="text-2xl font-bold text-[#DC2626]">
                  ₹{totalStats.totalPending.toLocaleString()}
                </p>
              </div>
              <div className="w-8 h-8 bg-[#DC2626]/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-[#DC2626]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">Processing</p>
                <p className="text-2xl font-bold text-[#EFB700]">
                  ₹{totalStats.totalProcessing.toLocaleString()}
                </p>
              </div>
              <div className="w-8 h-8 bg-[#EFB700]/10 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-[#EFB700]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">
                  Paid This Month
                </p>
                <p className="text-2xl font-bold text-[#16A34A]">
                  ₹{totalStats.totalPaid.toLocaleString()}
                </p>
              </div>
              <div className="w-8 h-8 bg-[#16A34A]/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-[#16A34A]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-[#E2E8F0]">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] h-4 w-4" />
              <Input
                placeholder="Search by worker name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
            <Select value={monthFilter} onValueChange={setMonthFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                <SelectItem value="January">January</SelectItem>
                <SelectItem value="February">February</SelectItem>
                <SelectItem value="March">March</SelectItem>
                <SelectItem value="April">April</SelectItem>
                <SelectItem value="May">May</SelectItem>
                <SelectItem value="June">June</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Salary Table */}
      <Card className="border-[#E2E8F0]">
        <CardHeader>
          <CardTitle className="text-[#1E293B] flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Salary Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Worker</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Work Summary</TableHead>
                  <TableHead>Gross Salary</TableHead>
                  <TableHead>Adjustments</TableHead>
                  <TableHead>Net Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Info</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSalaryData.map((salary) => (
                  <TableRow key={salary.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-[#1E293B]">
                          {salary.workerName}
                        </p>
                        <p className="text-sm text-[#475569]">
                          ID: {salary.workerId}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">
                          {salary.month} {salary.year}
                        </p>
                        <p className="text-xs text-[#475569]">
                          {salary.completedTasks} tasks completed
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">
                          {salary.totalItems} items
                        </p>
                        <p className="text-xs text-[#475569]">
                          @ ₹{salary.ratePerItem}/item
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">
                        ₹{salary.grossSalary.toLocaleString()}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {salary.bonuses > 0 && (
                          <p className="text-xs text-[#16A34A]">
                            +₹{salary.bonuses} bonus
                          </p>
                        )}
                        {salary.overtime > 0 && (
                          <p className="text-xs text-[#005B96]">
                            +₹{salary.overtime} overtime
                          </p>
                        )}
                        {salary.deductions > 0 && (
                          <p className="text-xs text-[#DC2626]">
                            -₹{salary.deductions} deductions
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-bold text-[#1E293B]">
                        ₹{salary.netSalary.toLocaleString()}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(salary.status)}>
                        {salary.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {salary.paymentDate ? (
                        <div>
                          <p className="text-sm font-medium">
                            {salary.paymentMethod}
                          </p>
                          <p className="text-xs text-[#475569]">
                            {new Date(salary.paymentDate).toLocaleDateString()}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-[#94A3B8]">Not paid yet</p>
                      )}
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
                            <Download className="w-4 h-4 mr-2" />
                            Download Slip
                          </DropdownMenuItem>
                          {salary.status === "pending" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedSalary(salary);
                                  setIsPaymentDialogOpen(true);
                                }}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Process Payment
                              </DropdownMenuItem>
                            </>
                          )}
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

      {/* Payment Processing Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Process Payment</DialogTitle>
            <DialogDescription>
              Process salary payment for the selected worker.
            </DialogDescription>
          </DialogHeader>
          {selectedSalary && (
            <div className="space-y-4">
              <div className="p-4 bg-[#F8FAFC] rounded-lg">
                <h4 className="font-medium text-[#1E293B]">
                  {selectedSalary.workerName}
                </h4>
                <p className="text-sm text-[#475569]">
                  {selectedSalary.month} {selectedSalary.year} - ₹
                  {selectedSalary.netSalary.toLocaleString()}
                </p>
              </div>
              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="paymentNotes">Payment Notes</Label>
                <Textarea
                  id="paymentNotes"
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  placeholder="Add any notes about this payment..."
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() =>
                selectedSalary && handleProcessPayment(selectedSalary.id)
              }
              className="bg-[#16A34A] hover:bg-[#16A34A]/90 text-white"
              disabled={!paymentMethod}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Process Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
