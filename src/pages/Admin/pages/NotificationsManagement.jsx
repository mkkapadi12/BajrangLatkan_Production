"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Bell,
  Send,
  Users,
  MessageSquare,
  Calendar,
  CheckCircle,
} from "lucide-react";

const mockNotifications = [
  {
    id: "1",
    title: "New Work Assignment Available",
    message:
      "New batch of 500 traditional latkans assigned. Please check your dashboard for details.",
    type: "task",
    recipients: "specific",
    recipientList: ["Rajesh Kumar", "Priya Sharma"],
    sentDate: "2024-01-20",
    status: "sent",
    readCount: 2,
    totalRecipients: 2,
  },
  {
    id: "2",
    title: "Monthly Salary Processed",
    message:
      "Your January salary has been processed and will be credited to your account within 2 business days.",
    type: "payment",
    recipients: "all",
    sentDate: "2024-01-31",
    status: "sent",
    readCount: 18,
    totalRecipients: 24,
  },
  {
    id: "3",
    title: "Quality Standards Reminder",
    message:
      "Please ensure all work meets our quality standards. Refer to the quality guidelines in your handbook.",
    type: "announcement",
    recipients: "all",
    sentDate: "2024-02-01",
    status: "scheduled",
    readCount: 0,
    totalRecipients: 24,
  },
];

const mockWorkers = [
  { id: "1", name: "Rajesh Kumar" },
  { id: "2", name: "Priya Sharma" },
  { id: "3", name: "Sunita Devi" },
  { id: "4", name: "Amit Patel" },
  { id: "5", name: "Ravi Singh" },
];

export function NotificationsManagement() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [notificationType, setNotificationType] = useState("");
  const [recipients, setRecipients] = useState("all");

  const handleCreateNotification = (formData) => {
    const newNotification = {
      id: Date.now().toString(),
      title: formData.get("title"),
      message: formData.get("message"),
      type: notificationType,
      recipients: recipients,
      recipientList: recipients === "specific" ? selectedWorkers : undefined,
      sentDate: new Date().toISOString().split("T")[0],
      status: "sent",
      readCount: 0,
      totalRecipients: recipients === "all" ? 24 : selectedWorkers.length,
    };
    setNotifications([newNotification, ...notifications]);
    setIsCreateDialogOpen(false);
    setSelectedWorkers([]);
    setNotificationType("");
    setRecipients("all");
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "announcement":
        return "bg-[#005B96] text-white";
      case "task":
        return "bg-[#7B1E3A] text-white";
      case "payment":
        return "bg-[#16A34A] text-white";
      case "reminder":
        return "bg-[#EFB700] text-white";
      default:
        return "bg-[#94A3B8] text-white";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "sent":
        return "bg-[#16A34A] text-white";
      case "scheduled":
        return "bg-[#EFB700] text-white";
      case "draft":
        return "bg-[#94A3B8] text-white";
      default:
        return "bg-[#94A3B8] text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Notifications</h1>
          <p className="text-[#475569]">
            Send announcements and updates to your workers
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#7B1E3A] hover:bg-[#7B1E3A]/90 text-white">
              <Send className="w-4 h-4 mr-2" />
              Create Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form action={handleCreateNotification}>
              <DialogHeader>
                <DialogTitle>Create New Notification</DialogTitle>
                <DialogDescription>
                  Send a notification to your workers.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter notification title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={notificationType}
                    onValueChange={setNotificationType}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select notification type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="task">Task Assignment</SelectItem>
                      <SelectItem value="payment">Payment Update</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="recipients">Recipients</Label>
                  <Select
                    value={recipients}
                    onValueChange={setRecipients}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Workers</SelectItem>
                      <SelectItem value="specific">Specific Workers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {recipients === "specific" && (
                  <div>
                    <Label>Select Workers</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2 overflow-y-auto max-h-32">
                      {mockWorkers.map((worker) => (
                        <label
                          key={worker.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={selectedWorkers.includes(worker.name)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedWorkers([
                                  ...selectedWorkers,
                                  worker.name,
                                ]);
                              } else {
                                setSelectedWorkers(
                                  selectedWorkers.filter(
                                    (name) => name !== worker.name
                                  )
                                );
                              }
                            }}
                            className="rounded border-[#E2E8F0]"
                          />
                          <span className="text-sm">{worker.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message here..."
                    rows={4}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-[#7B1E3A] hover:bg-[#7B1E3A]/90"
                  disabled={
                    recipients === "specific" && selectedWorkers.length === 0
                  }
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Notification
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">Total Sent</p>
                <p className="text-2xl font-bold text-[#1E293B]">
                  {notifications.length}
                </p>
              </div>
              <Bell className="h-8 w-8 text-[#7B1E3A]" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">Read Rate</p>
                <p className="text-2xl font-bold text-[#1E293B]">
                  {Math.round(
                    (notifications.reduce((acc, n) => acc + n.readCount, 0) /
                      notifications.reduce(
                        (acc, n) => acc + n.totalRecipients,
                        0
                      )) *
                      100
                  )}
                  %
                </p>
              </div>
              <div className="w-8 h-8 bg-[#16A34A]/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-[#16A34A]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">
                  Active Workers
                </p>
                <p className="text-2xl font-bold text-[#1E293B]">24</p>
              </div>
              <Users className="h-8 w-8 text-[#005B96]" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">This Month</p>
                <p className="text-2xl font-bold text-[#1E293B]">
                  {
                    notifications.filter(
                      (n) =>
                        new Date(n.sentDate).getMonth() ===
                        new Date().getMonth()
                    ).length
                  }
                </p>
              </div>
              <div className="w-8 h-8 bg-[#EFB700]/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-[#EFB700]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="border-[#E2E8F0]">
        <CardHeader>
          <CardTitle className="text-[#1E293B] flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 border border-[#E2E8F0] rounded-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-[#1E293B]">
                        {notification.title}
                      </h3>
                      <Badge className={getTypeColor(notification.type)}>
                        {notification.type}
                      </Badge>
                      <Badge className={getStatusColor(notification.status)}>
                        {notification.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#475569] mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                      <span>
                        Sent:{" "}
                        {new Date(notification.sentDate).toLocaleDateString()}
                      </span>
                      <span>
                        Recipients:{" "}
                        {notification.recipients === "all"
                          ? "All Workers"
                          : notification.recipientList?.join(", ")}
                      </span>
                      <span>
                        Read: {notification.readCount}/
                        {notification.totalRecipients}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-full bg-[#E2E8F0] rounded-full h-2 mr-4">
                    <div
                      className="bg-[#7B1E3A] h-2 rounded-full"
                      style={{
                        width: `${
                          (notification.readCount /
                            notification.totalRecipients) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-[#475569] whitespace-nowrap">
                    {Math.round(
                      (notification.readCount / notification.totalRecipients) *
                        100
                    )}
                    % read
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
