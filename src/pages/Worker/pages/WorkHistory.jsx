import React, { useEffect, useState } from "react";
import { Calendar, Package, IndianRupee, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthContext } from "@/context/AuthContext";
import { formatDate } from "@/helper/formatDate";
import { api } from "@/services/Worker/api";
import Loader from "@/helper/Loader";
import { Button } from "@/components/ui/Button";
import { ICONS } from "@/Icons/icons";

const WorkHistory = () => {
  const { user } = useAuthContext();
  const [selectedMonth, setSelectedMonth] = useState("September 2025");
  const [loading, setLoading] = useState(false);
  const [workHistory, setWorkHistory] = useState(null);

  const currentMonthData = Object.values(workHistory || {})[0];

  // Sort daily work by date (newest first)
  const sortedDailyWork =
    currentMonthData?.dailyWork.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ) || [];

  const totalMonthlyEarnings = sortedDailyWork.reduce(
    (sum, day) => sum + day.totalEarnings,
    0
  );
  const totalPackets = sortedDailyWork.reduce(
    (sum, day) =>
      sum +
      day.products.reduce((daySum, product) => daySum + product.packets, 0),
    0
  );

  const fetchWorkHistory = async () => {
    setLoading(true);
    try {
      const data = await api.getWorkHistory(user?._id, selectedMonth);
      setWorkHistory(data.workData); // if you want to store in state
    } catch (error) {
      console.error("Error fetching work history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchWorkHistory();
    }
  }, [user, selectedMonth]);

  if (loading) {
    return <Loader text={"Loading work history..."} />;
  }

  return (
    <div className="space-y-6">
      {/* Header with Month Selection */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Work History</h2>
          <p className="text-muted-foreground">
            Track your daily work progress and earnings
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="September 2025">September 2025</SelectItem>
              <SelectItem value="October 2025">October 2025</SelectItem>
              <SelectItem value="August 2025">August 2025</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <span onClick={fetchWorkHistory}>
              <ICONS.REFRESH />
            </span>
          </Button>
        </div>
      </div>

      {/* Monthly Summary Cards */}
      <div className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-3">
        <Card className="gap-0 sm:gap-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Earnings
            </CardTitle>
            <IndianRupee className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              ₹{totalMonthlyEarnings}
            </div>
            <p className="text-xs text-muted-foreground">For {selectedMonth}</p>
          </CardContent>
        </Card>

        <Card className="gap-0 sm:gap-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Packets</CardTitle>
            <Package className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {totalPackets}
            </div>
            <p className="text-xs text-muted-foreground">Packets completed</p>
          </CardContent>
        </Card>

        <Card className="gap-0 sm:gap-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Working Days</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {sortedDailyWork.length}
            </div>
            <p className="text-xs text-muted-foreground">Days worked</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Work History */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Daily Work Details
        </h3>

        {sortedDailyWork.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">
                No work data available for {selectedMonth}
              </p>
            </CardContent>
          </Card>
        ) : (
          sortedDailyWork.map((dayWork, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base font-medium">
                    {formatDate(dayWork.date)}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit">
                    Total: ₹{dayWork.totalEarnings}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="p-3 text-sm font-medium text-left text-muted-foreground">
                          Product
                        </th>
                        <th className="p-3 text-sm font-medium text-center text-muted-foreground">
                          Packets
                        </th>
                        <th className="p-3 text-sm font-medium text-center text-muted-foreground">
                          Rate
                        </th>
                        <th className="p-3 text-sm font-medium text-right text-muted-foreground">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dayWork.products.map((product, productIndex) => (
                        <tr
                          key={productIndex}
                          className="border-t border-border"
                        >
                          <td className="p-3 font-medium">
                            {product.productName}
                          </td>
                          <td className="p-3 text-center">{product.packets}</td>
                          <td className="p-3 text-center">₹{product.rate}</td>
                          <td className="p-3 font-medium text-right text-primary">
                            ₹{product.total}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkHistory;
