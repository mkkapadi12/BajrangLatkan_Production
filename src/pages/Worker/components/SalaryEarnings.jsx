"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Package,
  IndianRupee,
  Download,
  Clock,
  Fullscreen,
} from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { api } from "@/services/Worker/api";
import Loader from "@/helper/Loader";
import DownloadSalarySlip from "./DownloadSalarySlip";

export function SalaryEarnings() {
  const { user } = useAuthContext();
  const [salaryDetails, setSalaryDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("February 2026");

  const currentMonthData =
    salaryDetails?.months?.find((month) => month.month === selectedMonth) ||
    null;

  const fetchSalaryHistory = async () => {
    setLoading(true);
    try {
      const data = await api.getSalaryDetails(user?._id);
      // console.log("Salary Details:", data);
      setSalaryDetails(data.salaryDetails); // if you want to store in state
    } catch (error) {
      console.error("Error fetching salary history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchSalaryHistory();
    }
  }, [user, selectedMonth]);

  if (loading) {
    return <Loader text={"Loading salary history..."} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Salary & Earnings
          </h1>
          <p className="text-muted-foreground">
            Track your monthly earnings and payment history
          </p>
        </div>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="September 2025">September 2025</SelectItem>
            <SelectItem value="October 2025">October 2025</SelectItem>
            <SelectItem value="February 2026">February 2026</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {!currentMonthData ? (
        <div className="p-4 text-center rounded-lg bg-muted">
          <p className="text-sm text-muted-foreground">
            No salary data available for {selectedMonth}
          </p>
        </div>
      ) : (
        <main className="space-y-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card className="p-1 border-border">
              <CardContent className="p-2 sm:p-6">
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Earnings
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      ₹{currentMonthData?.totalEarnings.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-1 border-border">
              <CardContent className="p-2 sm:p-6">
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Packets
                    </p>
                    <p className="text-2xl font-bold text-secondary">
                      {currentMonthData?.totalPackets}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-1 border-border">
              <CardContent className="p-2 sm:p-6">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Month</p>
                    <p className="text-lg font-semibold text-foreground">
                      {currentMonthData?.month}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-1 border-border">
              <CardContent className="p-2 sm:p-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge
                      variant={
                        currentMonthData?.status === "Pending"
                          ? "secondary"
                          : "default"
                      }
                      className="mt-1"
                    >
                      {currentMonthData?.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Product-wise Earnings
                  </CardTitle>
                  <CardDescription>
                    Detailed breakdown for {currentMonthData?.month}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentMonthData?.productSummary.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 transition-colors rounded-lg bg-muted hover:bg-muted/80"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">
                            {product.productName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {product.packets} packets
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">
                            ₹{product.totalEarnings.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ₹
                            {(product.totalEarnings / product.packets).toFixed(
                              2,
                            )}
                            /packet
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 mt-4 border-t border-border">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10">
                        <div>
                          <span className="text-lg font-bold text-foreground">
                            Total
                          </span>
                          <p className="text-sm text-muted-foreground">
                            {currentMonthData?.totalPackets} packets
                          </p>
                        </div>
                        <span className="text-2xl font-bold text-primary">
                          ₹{currentMonthData?.totalEarnings.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Payment Information
                  </CardTitle>
                  <CardDescription>Payment details and actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="mb-1 text-sm text-muted-foreground">
                      Payment Status
                    </p>
                    <Badge
                      variant={
                        currentMonthData?.status === "Pending"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {currentMonthData?.status}
                    </Badge>
                  </div>

                  <div className="p-4 rounded-lg bg-muted">
                    <p className="mb-1 text-sm text-muted-foreground">
                      Expected Payment Date
                    </p>
                    <p className="font-semibold text-foreground">
                      5th of next month
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted">
                    <p className="mb-1 text-sm text-muted-foreground">
                      Payment Method
                    </p>
                    <p className="font-semibold text-foreground">
                      Bank Transfer
                    </p>
                  </div>

                  {currentMonthData?.status !== "Paid" && (
                    <DownloadSalarySlip
                      salaryData={currentMonthData}
                      workerData={user}
                    />
                  )}

                  {currentMonthData?.status === "Pending" && (
                    <p className="text-xs text-center text-muted-foreground">
                      Salary slip will be available after payment processing
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
