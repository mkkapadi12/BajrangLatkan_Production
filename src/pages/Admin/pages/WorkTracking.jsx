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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Activity,
  Search,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
} from "lucide-react";

const mockTasks = [
  {
    id: "1",
    clientName: "Rajesh Textiles",
    workType: "Traditional Latkans",
    quantity: 500,
    assignedWorker: "Rajesh Kumar",
    assignedDate: "2024-01-15",
    deadline: "2024-01-20",
    status: "in-progress",
    priority: "high",
    progress: 75,
    materials: ["Golden Thread", "Red Fabric"],
    description: "Traditional style latkans for wedding season",
  },
  {
    id: "2",
    clientName: "Sharma Exports",
    workType: "Designer Latkans",
    quantity: 200,
    assignedWorker: "Priya Sharma",
    assignedDate: "2024-01-10",
    deadline: "2024-01-25",
    status: "review",
    priority: "medium",
    progress: 100,
    materials: ["Silver Beads", "Decorative Stones"],
    description: "Designer latkans with silver beadwork",
    submittedWork: "Completed 200 designer latkans as per specifications",
  },
  {
    id: "3",
    clientName: "Festival Orders",
    workType: "Festival Special",
    quantity: 300,
    assignedWorker: "Sunita Devi",
    assignedDate: "2024-01-12",
    deadline: "2024-01-18",
    status: "overdue",
    priority: "urgent",
    progress: 60,
    materials: ["Golden Thread", "Silver Beads", "Red Fabric"],
    description: "Special festival collection with mixed designs",
  },
  {
    id: "4",
    clientName: "Local Store",
    workType: "Custom Orders",
    quantity: 100,
    assignedWorker: "Rajesh Kumar",
    assignedDate: "2024-01-08",
    deadline: "2024-01-22",
    status: "completed",
    priority: "low",
    progress: 100,
    materials: ["Decorative Stones"],
    description: "Custom design latkans for local retail",
  },
];

export function WorkTracking() {
  const [tasks, setTasks] = useState(mockTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewFeedback, setReviewFeedback] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.workType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedWorker.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-[#16A34A] text-white";
      case "in-progress":
        return "bg-[#005B96] text-white";
      case "pending":
        return "bg-[#94A3B8] text-white";
      case "overdue":
        return "bg-[#DC2626] text-white";
      case "review":
        return "bg-[#EFB700] text-white";
      default:
        return "bg-[#94A3B8] text-white";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-[#DC2626] text-white";
      case "high":
        return "bg-[#EFB700] text-white";
      case "medium":
        return "bg-[#005B96] text-white";
      case "low":
        return "bg-[#94A3B8] text-white";
      default:
        return "bg-[#94A3B8] text-white";
    }
  };

  const handleApproveWork = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: "completed", feedback: reviewFeedback }
          : task
      )
    );
    setIsReviewDialogOpen(false);
    setReviewFeedback("");
    setSelectedTask(null);
  };

  const handleRejectWork = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: "in-progress", feedback: reviewFeedback }
          : task
      )
    );
    setIsReviewDialogOpen(false);
    setReviewFeedback("");
    setSelectedTask(null);
  };

  const statusStats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
    overdue: tasks.filter((t) => t.status === "overdue").length,
    review: tasks.filter((t) => t.status === "review").length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E293B] mb-2">
          Work Tracking
        </h1>
        <p className="text-[#475569]">
          Monitor and manage all assigned work tasks
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#1E293B]">
                {statusStats.total}
              </p>
              <p className="text-sm text-[#475569]">Total Tasks</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#94A3B8]">
                {statusStats.pending}
              </p>
              <p className="text-sm text-[#475569]">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#005B96]">
                {statusStats.inProgress}
              </p>
              <p className="text-sm text-[#475569]">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#EFB700]">
                {statusStats.review}
              </p>
              <p className="text-sm text-[#475569]">Review</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#16A34A]">
                {statusStats.completed}
              </p>
              <p className="text-sm text-[#475569]">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#DC2626]">
                {statusStats.overdue}
              </p>
              <p className="text-sm text-[#475569]">Overdue</p>
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
                placeholder="Search by client, work type, or worker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card className="border-[#E2E8F0]">
        <CardHeader>
          <CardTitle className="text-[#1E293B] flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Work Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task Details</TableHead>
                  <TableHead>Worker</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Materials</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-[#1E293B]">
                          {task.clientName}
                        </p>
                        <p className="text-sm text-[#475569]">
                          {task.workType} - {task.quantity} items
                        </p>
                        <p className="text-xs text-[#94A3B8] mt-1">
                          {task.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-[#475569]" />
                        <span className="text-sm">{task.assignedWorker}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="flex items-center gap-1 text-sm">
                          <Calendar className="w-3 h-3" />
                          Assigned:{" "}
                          {new Date(task.assignedDate).toLocaleDateString()}
                        </p>
                        <p className="flex items-center gap-1 text-sm">
                          <Clock className="w-3 h-3" />
                          Due: {new Date(task.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{task.progress}%</span>
                        </div>
                        <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                          <div
                            className="bg-[#7B1E3A] h-2 rounded-full"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {task.materials.slice(0, 2).map((material, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {material}
                          </Badge>
                        ))}
                        {task.materials.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{task.materials.length - 2}
                          </Badge>
                        )}
                      </div>
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
                          {task.status === "review" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedTask(task);
                                  setIsReviewDialogOpen(true);
                                }}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Review Work
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

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Review Work Submission</DialogTitle>
            <DialogDescription>
              Review the submitted work and provide feedback to the worker.
            </DialogDescription>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              <div className="p-4 bg-[#F8FAFC] rounded-lg">
                <h4 className="font-medium text-[#1E293B]">
                  {selectedTask.clientName}
                </h4>
                <p className="text-sm text-[#475569]">
                  {selectedTask.workType} - {selectedTask.quantity} items
                </p>
                {selectedTask.submittedWork && (
                  <p className="text-sm text-[#1E293B] mt-2">
                    {selectedTask.submittedWork}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                  id="feedback"
                  value={reviewFeedback}
                  onChange={(e) => setReviewFeedback(e.target.value)}
                  placeholder="Provide feedback on the submitted work..."
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => selectedTask && handleRejectWork(selectedTask.id)}
              className="text-[#DC2626] border-[#DC2626] hover:bg-[#DC2626] hover:text-white"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
            <Button
              onClick={() => selectedTask && handleApproveWork(selectedTask.id)}
              className="bg-[#16A34A] hover:bg-[#16A34A]/90 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
