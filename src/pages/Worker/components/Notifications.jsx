import { CheckCircle, AlertCircle, Bell } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/Button";

const mockNotifications = [
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
  {
    id: 4,
    message: "Quality check completed for Decorative Latkan",
    time: "3 days ago",
    type: "success",
  },
  {
    id: 5,
    message: "New training session scheduled for next week",
    time: "1 week ago",
    type: "info",
  },
];

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

export function Notifications() {
  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Notifications</CardTitle>
          <CardDescription>
            Stay updated with important announcements and messages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start p-4 space-x-4 border rounded-lg border-border"
              >
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <p className="text-foreground">{notification.message}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Mark as Read
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
