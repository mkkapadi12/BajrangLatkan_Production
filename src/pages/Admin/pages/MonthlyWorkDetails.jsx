import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Calendar,
  Package,
  IndianRupee,
  TrendingUp,
  User,
  MapPin,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useWorkContext } from "@/context/WorkContext";
import Loader from "@/helper/Loader";

const availableMonths = [
  "September 2025",
  "October 2025",
  "August 2025",
  "July 2025",
  "June 2025",
  "May 2025",
];

function MonthlyWorkDetails() {
  const { id } = useParams();
  const router = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("September 2025");
  const { getMonthlyWork } = useWorkContext();
  const [work, setWork] = useState(null); // single object, not array
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentWorkData = Object.values(work || {})[0];

  // Calculate monthly statistics
  const monthlyStats = currentWorkData
    ? {
        totalDays: currentWorkData.dailyWork.length,
        totalPackets: currentWorkData.dailyWork.reduce(
          (sum, day) =>
            sum +
            day.products.reduce(
              (daySum, product) => daySum + product.packets,
              0
            ),
          0
        ),
        totalEarnings: currentWorkData.dailyWork.reduce(
          (sum, day) => sum + day.totalEarnings,
          0
        ),
        avgDailyEarnings:
          currentWorkData.dailyWork.length > 0
            ? currentWorkData.dailyWork.reduce(
                (sum, day) => sum + day.totalEarnings,
                0
              ) / currentWorkData.dailyWork.length
            : 0,
        topProduct: currentWorkData.dailyWork
          .flatMap((day) => day.products)
          .reduce((acc, product) => {
            const existing = acc.find(
              (p) => p.productName === product.productName
            );
            if (existing) {
              existing.packets += product.packets;
              existing.total += product.total;
            } else {
              acc.push({ ...product });
            }
            return acc;
          }, [])
          .sort((a, b) => b.total - a.total)[0],
      }
    : null;

  const fetchWorkDetails = async (id, selectedMonth) => {
    try {
      const response = await getMonthlyWork(id, selectedMonth);
      setWork(response.workData); // backend returns { msg, month, work }
      setErrorMsg(null); // reset if data is found
    } catch (error) {
      if (error.response?.status === 404) {
        setErrorMsg(`No work data found for ${selectedMonth}`);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
      setWork(null); // clear work data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchWorkDetails(id, selectedMonth);
    }
  }, [id, selectedMonth]);

  if (loading) {
    return <Loader text="Loading work details..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:items-center sm:justify-between sm:flex-row">
        <div className="flex flex-col items-start justify-start gap-4 sm:items-center sm:flex-row">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router(-1)}
            className="border-[#E2E8F0] hover:bg-[#F8FAFC]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">
              Worker Work Details
            </h1>
            <p className="text-[#475569]">
              {currentWorkData?.worker.fullName || "Worker Name"} - Monthly Work
              Summary
            </p>
          </div>
        </div>

        {/* Month Selector */}
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[200px]">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {availableMonths.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentWorkData ? (
        <>
          {/* Worker Info Card */}
          <Card className="border-[#E2E8F0]">
            <CardContent className="p-3 md:p-6 sm:p-4">
              <div className="flex flex-col justify-center gap-4 sm:items-center sm:flex-row">
                <div className="h-16 w-16 bg-[#7B1E3A] rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#1E293B]">
                    {currentWorkData?.worker?.fullName}
                  </h3>
                  <p className="text-[#475569] flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    Worker ID: {currentWorkData?.worker?.workerId}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-sm text-[#475569]">Selected Month</p>
                  <p className="text-lg font-semibold text-[#7B1E3A]">
                    {selectedMonth}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Statistics */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Card className="border-[#E2E8F0]">
              <CardContent className="p-4">
                <div className="text-center">
                  <Calendar className="h-8 w-8 text-[#7B1E3A] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#1E293B]">
                    {monthlyStats?.totalDays}
                  </p>
                  <p className="text-sm text-[#475569]">Working Days</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#E2E8F0]">
              <CardContent className="p-4">
                <div className="text-center">
                  <Package className="h-8 w-8 text-[#005B96] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#1E293B]">
                    {monthlyStats?.totalPackets}
                  </p>
                  <p className="text-sm text-[#475569]">Total Packets</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#E2E8F0]">
              <CardContent className="p-4">
                <div className="text-center">
                  <IndianRupee className="h-8 w-8 text-[#EFB700] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#1E293B]">
                    ₹{monthlyStats?.totalEarnings}
                  </p>
                  <p className="text-sm text-[#475569]">Total Earnings</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#E2E8F0]">
              <CardContent className="p-4">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-[#16A34A] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#1E293B]">
                    ₹{Math.round(monthlyStats?.avgDailyEarnings || 0)}
                  </p>
                  <p className="text-sm text-[#475569]">Avg Daily</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Product */}
          {monthlyStats?.topProduct && (
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-[#1E293B] flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top Performing Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                  <div>
                    <h4 className="font-semibold text-[#1E293B]">
                      {monthlyStats.topProduct.productName}
                    </h4>
                    <p className="text-[#475569]">
                      Rate: ₹{monthlyStats.topProduct.rate} per packet
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#7B1E3A]">
                      {monthlyStats.topProduct.packets}
                    </p>
                    <p className="text-sm text-[#475569]">packets</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#16A34A]">
                      ₹{monthlyStats.topProduct.total}
                    </p>
                    <p className="text-sm text-[#475569]">earned</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Daily Work Details */}
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle className="text-[#1E293B] flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Daily Work Details - {selectedMonth}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {currentWorkData?.dailyWork
                  ?.slice() // copy array to avoid mutating state
                  .sort((a, b) => new Date(a.date) - new Date(b.date)) // ascending (old → new)
                  .map((dayWork) => (
                    <div
                      key={dayWork._id}
                      className="border border-[#E2E8F0] rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-[#1E293B] flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(dayWork.date).toLocaleDateString("en-IN", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </h4>
                        <Badge className="bg-[#16A34A] text-white">
                          ₹{dayWork.totalEarnings} earned
                        </Badge>
                      </div>

                      <div className="grid gap-3">
                        {dayWork.products.map((product, index) => (
                          <div
                            key={product._id || index}
                            className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg"
                          >
                            <div className="flex-1">
                              <h5 className="font-medium text-[#1E293B]">
                                {product.productName}
                              </h5>
                              <p className="text-sm text-[#475569]">
                                Rate: ₹{product.rate} per packet
                              </p>
                            </div>
                            <div className="mx-4 text-center">
                              <p className="text-lg font-semibold text-[#005B96]">
                                {product.packets}
                              </p>
                              <p className="text-xs text-[#475569]">packets</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-[#7B1E3A]">
                                ₹{product.total}
                              </p>
                              <p className="text-xs text-[#475569]">total</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-12 text-center">
            <Calendar className="h-16 w-16 text-[#94A3B8] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#1E293B] mb-2">
              No Data Available
            </h3>
            <p className="text-[#475569]">
              No work data found for {selectedMonth}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default MonthlyWorkDetails;
