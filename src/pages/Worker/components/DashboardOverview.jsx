import { CheckCircle, AlertCircle, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/AuthContext";
import { useSalaryContext } from "@/context/SalaryContext";

export function DashboardOverview() {
  const { user } = useAuthContext();
  const { salaryDetails, currentMonthData } = useSalaryContext();

  const totalPackets = salaryDetails?.months?.reduce(
    (sum, item) => sum + (item.totalPackets || 0),
    0,
  );

  const totalEarnings = salaryDetails?.months?.reduce(
    (sum, item) => sum + (item.totalEarnings || 0),
    0,
  );

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
                  user?.status === "Active"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-red-100 text-red-800 border-red-200",
                )}
              >
                {user?.status === "Active" ? "✅" : "❌"} {user?.status}
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
              {/* {mockWorkerData.stats.assignedTasks} */} Not Available
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Packets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalPackets}
            </div>
            {/* <p className="mt-1 text-xs text-muted-foreground">This month</p> */}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {totalEarnings}
            </div>
            {/* <p className="mt-1 text-xs text-muted-foreground">Current month</p> */}
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
              {/* {mockWorkerData.stats.workRate}% */}
              Not Available
            </div>
            {/* <Progress value={mockWorkerData.stats.workRate} className="mt-2" /> */}
            <Progress value={0} className="mt-2" />
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
          <CardContent>Not Available</CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>Not Available</CardContent>
        </Card>
      </div>
    </div>
  );
}
