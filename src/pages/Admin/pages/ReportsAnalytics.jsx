import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Package,
  Clock,
  Award,
  AlertTriangle,
} from "lucide-react";

const productionData = [
  {
    month: "Jan",
    traditional: 2400,
    designer: 1800,
    festival: 1200,
    custom: 800,
  },
  {
    month: "Feb",
    traditional: 2800,
    designer: 2100,
    festival: 1400,
    custom: 900,
  },
  {
    month: "Mar",
    traditional: 3200,
    designer: 2400,
    festival: 1600,
    custom: 1100,
  },
  {
    month: "Apr",
    traditional: 2900,
    designer: 2200,
    festival: 1300,
    custom: 950,
  },
  {
    month: "May",
    traditional: 3500,
    designer: 2800,
    festival: 1800,
    custom: 1200,
  },
  {
    month: "Jun",
    traditional: 3800,
    designer: 3000,
    festival: 2000,
    custom: 1400,
  },
];

const workerPerformanceData = [
  { name: "Rajesh Kumar", completed: 145, rating: 4.8, efficiency: 92 },
  { name: "Priya Sharma", completed: 98, rating: 4.6, efficiency: 88 },
  { name: "Sunita Devi", completed: 203, rating: 4.9, efficiency: 95 },
  { name: "Amit Patel", completed: 67, rating: 4.2, efficiency: 78 },
  { name: "Ravi Singh", completed: 23, rating: 3.8, efficiency: 65 },
];

const salaryTrendData = [
  { month: "Jan", totalSalary: 45200, workers: 24, avgSalary: 1883 },
  { month: "Feb", totalSalary: 52800, workers: 26, avgSalary: 2031 },
  { month: "Mar", totalSalary: 58400, workers: 28, avgSalary: 2086 },
  { month: "Apr", totalSalary: 54600, workers: 27, avgSalary: 2022 },
  { month: "May", totalSalary: 61200, workers: 30, avgSalary: 2040 },
  { month: "Jun", totalSalary: 67800, workers: 32, avgSalary: 2119 },
];

const workTypeDistribution = [
  { name: "Traditional Latkans", value: 45, color: "#7B1E3A" },
  { name: "Designer Latkans", value: 30, color: "#EFB700" },
  { name: "Festival Special", value: 15, color: "#005B96" },
  { name: "Custom Orders", value: 10, color: "#16A34A" },
];

const materialUsageData = [
  { material: "Golden Thread", used: 85, available: 15, trend: "high" },
  { material: "Silver Beads", used: 60, available: 40, trend: "medium" },
  { material: "Red Fabric", used: 90, available: 10, trend: "critical" },
  { material: "Decorative Stones", used: 45, available: 55, trend: "low" },
];

export function ReportsAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [selectedReport, setSelectedReport] = useState("overview");

  const getTrendColor = (trend) => {
    switch (trend) {
      case "critical":
        return "text-[#DC2626]";
      case "high":
        return "text-[#EFB700]";
      case "medium":
        return "text-[#005B96]";
      case "low":
        return "text-[#16A34A]";
      default:
        return "text-[#94A3B8]";
    }
  };

  const getTrendBadge = (trend) => {
    switch (trend) {
      case "critical":
        return "bg-[#DC2626] text-white";
      case "high":
        return "bg-[#EFB700] text-white";
      case "medium":
        return "bg-[#005B96] text-white";
      case "low":
        return "bg-[#16A34A] text-white";
      default:
        return "bg-[#94A3B8] text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">
            Reports & Analytics
          </h1>
          <p className="text-[#475569]">
            Comprehensive business insights and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[150px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="border-[#7B1E3A] text-[#7B1E3A] hover:bg-[#7B1E3A] hover:text-white bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">
                  Total Production
                </p>
                <p className="text-2xl font-bold text-[#1E293B]">18,400</p>
                <p className="text-xs text-[#16A34A] mt-1">
                  +12% from last period
                </p>
              </div>
              <div className="w-12 h-12 bg-[#7B1E3A]/10 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-[#7B1E3A]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">
                  Revenue Generated
                </p>
                <p className="text-2xl font-bold text-[#1E293B]">₹3,42,000</p>
                <p className="text-xs text-[#16A34A] mt-1">
                  +18% from last period
                </p>
              </div>
              <div className="w-12 h-12 bg-[#16A34A]/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-[#16A34A]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">
                  Avg Completion Time
                </p>
                <p className="text-2xl font-bold text-[#1E293B]">4.2 days</p>
                <p className="text-xs text-[#16A34A] mt-1">-8% faster</p>
              </div>
              <div className="w-12 h-12 bg-[#005B96]/10 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-[#005B96]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">
                  Quality Score
                </p>
                <p className="text-2xl font-bold text-[#1E293B]">4.7/5</p>
                <p className="text-xs text-[#16A34A] mt-1">+0.2 improvement</p>
              </div>
              <div className="w-12 h-12 bg-[#EFB700]/10 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-[#EFB700]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Production Trends */}
        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-[#1E293B] flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Production Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#475569" />
                  <YAxis stroke="#475569" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="traditional" stackId="a" fill="#7B1E3A" />
                  <Bar dataKey="designer" stackId="a" fill="#EFB700" />
                  <Bar dataKey="festival" stackId="a" fill="#005B96" />
                  <Bar dataKey="custom" stackId="a" fill="#16A34A" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#7B1E3A] rounded-full" />
                <span className="text-sm text-[#475569]">Traditional</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#EFB700] rounded-full" />
                <span className="text-sm text-[#475569]">Designer</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#005B96] rounded-full" />
                <span className="text-sm text-[#475569]">Festival</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#16A34A] rounded-full" />
                <span className="text-sm text-[#475569]">Custom</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Type Distribution */}
        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-[#1E293B] flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Work Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={workTypeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {workTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {workTypeDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-[#475569]">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-[#1E293B]">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Worker Performance */}
        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-[#1E293B] flex items-center gap-2">
              <Users className="w-5 h-5" />
              Worker Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workerPerformanceData.map((worker, index) => (
                <div
                  key={index}
                  className="p-4 border border-[#E2E8F0] rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[#1E293B]">
                      {worker.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          worker.efficiency >= 90
                            ? "bg-[#16A34A] text-white"
                            : worker.efficiency >= 80
                            ? "bg-[#EFB700] text-white"
                            : "bg-[#DC2626] text-white"
                        }
                      >
                        {worker.efficiency}% efficiency
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[#475569]">Completed Tasks</p>
                      <p className="font-medium text-[#1E293B]">
                        {worker.completed}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#475569]">Rating</p>
                      <p className="font-medium text-[#1E293B]">
                        {worker.rating}/5
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress value={worker.efficiency} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Material Usage */}
        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-[#1E293B] flex items-center gap-2">
              <Package className="w-5 h-5" />
              Material Usage Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {materialUsageData.map((material, index) => (
                <div
                  key={index}
                  className="p-4 border border-[#E2E8F0] rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[#1E293B]">
                      {material.material}
                    </span>
                    <Badge className={getTrendBadge(material.trend)}>
                      {material.trend === "critical"
                        ? "Critical"
                        : material.trend}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#475569]">
                        Used: {material.used}%
                      </span>
                      <span className="text-[#475569]">
                        Available: {material.available}%
                      </span>
                    </div>
                    <Progress value={material.used} className="h-2" />
                    {material.trend === "critical" && (
                      <div className="flex items-center gap-1 text-xs text-[#DC2626]">
                        <AlertTriangle className="w-3 h-3" />
                        Reorder required immediately
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Trends */}
      <Card className="border-[#E2E8F0]">
        <CardHeader>
          <CardTitle className="text-[#1E293B] flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Salary & Cost Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salaryTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#475569" />
                <YAxis stroke="#475569" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="totalSalary"
                  stroke="#7B1E3A"
                  strokeWidth={3}
                  dot={{ fill: "#7B1E3A", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="avgSalary"
                  stroke="#EFB700"
                  strokeWidth={2}
                  dot={{ fill: "#EFB700", strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#7B1E3A] rounded-full" />
              <span className="text-sm text-[#475569]">
                Total Monthly Salary
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#EFB700] rounded-full" />
              <span className="text-sm text-[#475569]">
                Average Salary per Worker
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
