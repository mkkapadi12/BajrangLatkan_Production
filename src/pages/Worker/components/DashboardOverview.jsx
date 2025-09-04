import { CheckCircle, AlertCircle, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/AuthContext";

const mockWorkerData = {
  name: "Rajesh Kumar",
  workerId: "WORKER01",
  status: "Active",
  profileImage: "/indian-worker-profile.jpg",
  stats: {
    assignedTasks: 12,
    completedWork: 8,
    earnings: 4500,
    workRate: 85,
  },
  assignedWork: [
    {
      id: 1,
      product: "Beaded Necklace",
      quantity: 50,
      deadline: "2024-01-15",
      status: "In Progress",
      completed: 30,
    },
    {
      id: 2,
      product: "Thread Bangles",
      quantity: 100,
      deadline: "2024-01-18",
      status: "Pending",
      completed: 0,
    },
    {
      id: 3,
      product: "Decorative Latkan",
      quantity: 75,
      deadline: "2024-01-20",
      status: "Completed",
      completed: 75,
    },
  ],
  notifications: [
    {
      id: 1,
      message: "New raw material has been assigned for Thread Bangles",
      time: "2 hours ago",
      type: "info",
    },
    {
      id: 2,
      message: "Your salary will be credited on 5th January",
      time: "1 day ago",
      type: "success",
    },
    {
      id: 3,
      message: "Deadline approaching for Beaded Necklace project",
      time: "2 days ago",
      type: "warning",
    },
  ],
};

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "In Progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getNotificationIcon = (type) => {
  switch (type) {
    case "success":
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case "warning":
      return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    case "info":
      return <Bell className="w-4 h-4 text-blue-600" />;
    default:
      return <Bell className="w-4 h-4 text-gray-600" />;
  }
};

export function DashboardOverview() {
  const { user } = useAuthContext();

  console.log("Worker Data :", user);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="border-border">
        <CardContent className="p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-start lg:items-center">
            {/* Avatar + Name */}
            <div className="flex flex-col items-center space-y-3 text-center sm:flex-row sm:space-y-0 sm:space-x-4 sm:text-left">
              <Avatar className="w-14 h-14 sm:w-16 sm:h-16 ring-2 ring-bajrang-accent hover:ring-bajrang-warning">
                <AvatarImage
                  src={user?.photo || "/placeholder.svg"}
                  alt={user?.fullName}
                />
                <AvatarFallback className="text-lg font-semibold text-bajrang-brand bg-bajrang-accent/20">
                  {user?.fullName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold sm:text-2xl text-foreground">
                  Welcome, {user?.fullName}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Worker ID: {user?.workerId}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mt-2 md:mt-0">
              <Badge
                className={cn(
                  "px-3 py-1 text-sm sm:text-base",
                  mockWorkerData.status === "Active"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-red-100 text-red-800 border-red-200"
                )}
              >
                {mockWorkerData.status === "Active" ? "✅" : "❌"}{" "}
                {mockWorkerData.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Assigned Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {mockWorkerData.stats.assignedTasks}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Active projects
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Work
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockWorkerData.stats.completedWork}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              ₹{mockWorkerData.stats.earnings}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Current month</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Work Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockWorkerData.stats.workRate}%
            </div>
            <Progress value={mockWorkerData.stats.workRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Work & Notifications */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              Recent Assigned Work
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockWorkerData.assignedWork.slice(0, 3).map((work) => (
                <div
                  key={work.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {work.product}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {work.quantity}
                    </p>
                  </div>
                  <Badge className={getStatusColor(work.status)}>
                    {work.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockWorkerData.notifications.slice(0, 3).map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start p-3 space-x-3 rounded-lg bg-muted"
                >
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      {notification.message}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
