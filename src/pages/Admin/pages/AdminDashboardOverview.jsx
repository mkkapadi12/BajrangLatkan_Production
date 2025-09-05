import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  ClipboardList,
  CheckCircle,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Calendar,
  Package,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const AdminDashboardOverview = () => {
  const stats = [
    {
      title: "Total Workers",
      value: "24",
      change: "+2 this month",
      icon: Users,
      color: "text-[#005B96]",
      bgColor: "bg-[#005B96]/10",
    },
    {
      title: "Ongoing Work",
      value: "18",
      change: "6 due today",
      icon: ClipboardList,
      color: "text-[#EFB700]",
      bgColor: "bg-[#EFB700]/10",
    },
    {
      title: "Completed Today",
      value: "12",
      change: "+4 from yesterday",
      icon: CheckCircle,
      color: "text-[#16A34A]",
      bgColor: "bg-[#16A34A]/10",
    },
    {
      title: "Pending Salaries",
      value: "₹45,200",
      change: "8 workers pending",
      icon: DollarSign,
      color: "text-[#DC2626]",
      bgColor: "bg-[#DC2626]/10",
    },
  ];

  const recentActivities = [
    {
      worker: "Rajesh Kumar",
      action: "Completed 50 latkans",
      time: "2 hours ago",
      status: "completed",
    },
    {
      worker: "Priya Sharma",
      action: "Started new batch of 100 items",
      time: "4 hours ago",
      status: "in-progress",
    },
    {
      worker: "Amit Patel",
      action: "Submitted work for review",
      time: "6 hours ago",
      status: "review",
    },
    {
      worker: "Sunita Devi",
      action: "Received new materials",
      time: "1 day ago",
      status: "materials",
    },
  ];

  const productionMetrics = [
    {
      name: "Traditional Latkans",
      completed: 450,
      target: 500,
      percentage: 90,
    },
    { name: "Designer Latkans", completed: 280, target: 350, percentage: 80 },
    { name: "Festival Special", completed: 120, target: 200, percentage: 60 },
    { name: "Custom Orders", completed: 85, target: 100, percentage: 85 },
  ];

  const upcomingDeadlines = [
    {
      client: "Rajesh Textiles",
      items: "500 Traditional Latkans",
      deadline: "Tomorrow",
      priority: "high",
    },
    {
      client: "Sharma Exports",
      items: "200 Designer Latkans",
      deadline: "3 days",
      priority: "medium",
    },
    {
      client: "Festival Orders",
      items: "300 Mixed Items",
      deadline: "1 week",
      priority: "low",
    },
  ];

  const materialStatus = [
    { material: "Golden Thread", stock: "85%", status: "good" },
    { material: "Silver Beads", stock: "45%", status: "medium" },
    { material: "Red Fabric", stock: "15%", status: "low" },
    { material: "Decorative Stones", stock: "70%", status: "good" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E293B] mb-2">
          Dashboard Overview
        </h1>
        <p className="text-[#475569]">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-[#E2E8F0]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#475569] text-sm font-medium">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-[#1E293B] mt-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Production Progress */}
        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-[#1E293B] flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Production Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productionMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#1E293B]">
                      {metric.name}
                    </span>
                    <span className="text-sm text-[#475569]">
                      {metric.completed}/{metric.target}
                    </span>
                  </div>
                  <Progress value={metric.percentage} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#94A3B8]">
                      {metric.percentage}% Complete
                    </span>
                    <Badge
                      variant={
                        metric.percentage >= 90
                          ? "default"
                          : metric.percentage >= 70
                          ? "secondary"
                          : "destructive"
                      }
                      className="text-xs"
                    >
                      {metric.percentage >= 90
                        ? "On Track"
                        : metric.percentage >= 70
                        ? "Good"
                        : "Behind"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-[#1E293B] flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      deadline.priority === "high"
                        ? "bg-[#DC2626]"
                        : deadline.priority === "medium"
                        ? "bg-[#EFB700]"
                        : "bg-[#16A34A]"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1E293B]">
                      {deadline.client}
                    </p>
                    <p className="text-xs text-[#475569]">{deadline.items}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        deadline.priority === "high"
                          ? "destructive"
                          : deadline.priority === "medium"
                          ? "secondary"
                          : "default"
                      }
                      className="text-xs"
                    >
                      {deadline.deadline}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Material Status */}
        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-[#1E293B] flex items-center gap-2">
              <Package className="w-5 h-5" />
              Material Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {materialStatus.map((material, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#F8FAFC]"
                >
                  <div>
                    <p className="text-sm font-medium text-[#1E293B]">
                      {material.material}
                    </p>
                    <p className="text-xs text-[#475569]">
                      Current Stock: {material.stock}
                    </p>
                  </div>
                  <Badge
                    variant={
                      material.status === "good"
                        ? "default"
                        : material.status === "medium"
                        ? "secondary"
                        : "destructive"
                    }
                    className="text-xs"
                  >
                    {material.status === "good"
                      ? "Good"
                      : material.status === "medium"
                      ? "Medium"
                      : "Low Stock"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-[#1E293B] flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#F8FAFC]"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.status === "completed"
                        ? "bg-[#16A34A]"
                        : activity.status === "in-progress"
                        ? "bg-[#EFB700]"
                        : activity.status === "review"
                        ? "bg-[#005B96]"
                        : "bg-[#94A3B8]"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1E293B]">
                      {activity.worker}
                    </p>
                    <p className="text-xs text-[#475569]">{activity.action}</p>
                  </div>
                  <p className="text-xs text-[#94A3B8]">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-[#E2E8F0]">
        <CardHeader>
          <CardTitle className="text-[#1E293B] flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <button className="p-4 text-left rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#1E293B]">Add New Worker</p>
                  <p className="text-sm text-[#475569]">
                    Register a new worker
                  </p>
                </div>
                <Users className="h-5 w-5 text-[#7B1E3A]" />
              </div>
            </button>

            <button className="p-4 text-left rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#1E293B]">Assign New Work</p>
                  <p className="text-sm text-[#475569]">
                    Create work assignment
                  </p>
                </div>
                <ClipboardList className="h-5 w-5 text-[#7B1E3A]" />
              </div>
            </button>

            <button className="p-4 text-left rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#1E293B]">Process Salaries</p>
                  <p className="text-sm text-[#475569]">Calculate payments</p>
                </div>
                <DollarSign className="h-5 w-5 text-[#7B1E3A]" />
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardOverview;
