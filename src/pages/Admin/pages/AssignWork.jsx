import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ClipboardList, CalendarIcon, User, Package, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const mockWorkers = [
  {
    id: "1",
    name: "Rajesh Kumar",
    skills: ["Traditional Latkans", "Designer Work"],
    currentWorkload: 2,
    maxCapacity: 5,
    status: "available",
  },
  {
    id: "2",
    name: "Priya Sharma",
    skills: ["Festival Special", "Custom Orders"],
    currentWorkload: 4,
    maxCapacity: 5,
    status: "busy",
  },
  {
    id: "3",
    name: "Sunita Devi",
    skills: ["Designer Work", "Beadwork"],
    currentWorkload: 1,
    maxCapacity: 4,
    status: "available",
  },
  {
    id: "4",
    name: "Amit Patel",
    skills: ["Traditional Latkans", "Quality Control"],
    currentWorkload: 0,
    maxCapacity: 3,
    status: "on-leave",
  },
];

const mockMaterials = [
  { id: "1", name: "Golden Thread", available: 500, unit: "meters" },
  { id: "2", name: "Silver Beads", available: 200, unit: "grams" },
  { id: "3", name: "Red Fabric", available: 50, unit: "meters" },
  { id: "4", name: "Decorative Stones", available: 150, unit: "pieces" },
];

export function AssignWork() {
  const [selectedWorker, setSelectedWorker] = useState("");
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [deadline, setDeadline] = useState();
  const [workType, setWorkType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [priority, setPriority] = useState("");

  const getWorkerStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-[#16A34A] text-white";
      case "busy":
        return "bg-[#EFB700] text-white";
      case "on-leave":
        return "bg-[#94A3B8] text-white";
      default:
        return "bg-[#94A3B8] text-white";
    }
  };

  const handleAssignWork = () => {
    // Handle work assignment logic here
    console.log("Assigning work:", {
      worker: selectedWorker,
      materials: selectedMaterials,
      deadline,
      workType,
      quantity,
      description,
      clientName,
      priority,
    });
    // Reset form
    setSelectedWorker("");
    setSelectedMaterials([]);
    setDeadline(undefined);
    setWorkType("");
    setQuantity("");
    setDescription("");
    setClientName("");
    setPriority("");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E293B] mb-2">Assign Work</h1>
        <p className="text-[#475569]">
          Create and assign new work tasks to your workers
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Assignment Form */}
        <div className="lg:col-span-2">
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle className="text-[#1E293B] flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Work Assignment Form
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Client Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1E293B]">
                  Client Information
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Enter client name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Work Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1E293B]">
                  Work Details
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="workType">Work Type</Label>
                    <Select value={workType} onValueChange={setWorkType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select work type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="traditional">
                          Traditional Latkans
                        </SelectItem>
                        <SelectItem value="designer">
                          Designer Latkans
                        </SelectItem>
                        <SelectItem value="festival">
                          Festival Special
                        </SelectItem>
                        <SelectItem value="custom">Custom Orders</SelectItem>
                        <SelectItem value="beadwork">Beadwork</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Enter quantity"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Work Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the work requirements, specifications, and any special instructions..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1E293B]">
                  Timeline
                </h3>
                <div>
                  <Label>Deadline</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !deadline && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {deadline ? format(deadline, "PPP") : "Pick a deadline"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={deadline}
                        onSelect={setDeadline}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Materials */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1E293B]">
                  Required Materials
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {mockMaterials.map((material) => (
                    <div
                      key={material.id}
                      className={cn(
                        "p-3 border rounded-lg cursor-pointer transition-colors",
                        selectedMaterials.includes(material.id)
                          ? "border-[#7B1E3A] bg-[#7B1E3A]/5"
                          : "border-[#E2E8F0] hover:border-[#7B1E3A]/50"
                      )}
                      onClick={() => {
                        setSelectedMaterials((prev) =>
                          prev.includes(material.id)
                            ? prev.filter((id) => id !== material.id)
                            : [...prev, material.id]
                        );
                      }}
                    >
                      <p className="font-medium text-[#1E293B]">
                        {material.name}
                      </p>
                      <p className="text-sm text-[#475569]">
                        {material.available} {material.unit} available
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Worker Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1E293B]">
                  Assign to Worker
                </h3>
                <Select
                  value={selectedWorker}
                  onValueChange={setSelectedWorker}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a worker" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockWorkers.map((worker) => (
                      <SelectItem
                        key={worker.id}
                        value={worker.id}
                        disabled={worker.status === "on-leave"}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{worker.name}</span>
                          <Badge
                            className={cn(
                              "ml-2",
                              getWorkerStatusColor(worker.status)
                            )}
                          >
                            {worker.status}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleAssignWork}
                className="w-full bg-[#7B1E3A] hover:bg-[#7B1E3A]/90 text-white"
                disabled={
                  !selectedWorker || !workType || !quantity || !deadline
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Assign Work
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Worker Status & Materials Overview */}
        <div className="space-y-6">
          {/* Worker Status */}
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle className="text-[#1E293B] flex items-center gap-2">
                <User className="w-5 h-5" />
                Worker Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockWorkers.map((worker) => (
                  <div
                    key={worker.id}
                    className="p-3 border border-[#E2E8F0] rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-[#1E293B]">
                        {worker.name}
                      </span>
                      <Badge className={getWorkerStatusColor(worker.status)}>
                        {worker.status}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#475569]">Workload</span>
                        <span className="text-[#1E293B]">
                          {worker.currentWorkload}/{worker.maxCapacity}
                        </span>
                      </div>
                      <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                        <div
                          className="bg-[#7B1E3A] h-2 rounded-full"
                          style={{
                            width: `${
                              (worker.currentWorkload / worker.maxCapacity) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {worker.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Materials Overview */}
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle className="text-[#1E293B] flex items-center gap-2">
                <Package className="w-5 h-5" />
                Materials Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockMaterials.map((material) => (
                  <div
                    key={material.id}
                    className="flex items-center justify-between p-2 border-b border-[#E2E8F0]"
                  >
                    <div>
                      <p className="font-medium text-[#1E293B]">
                        {material.name}
                      </p>
                      <p className="text-sm text-[#475569]">
                        {material.available} {material.unit}
                      </p>
                    </div>
                    <Badge
                      variant={
                        material.available > 100
                          ? "default"
                          : material.available > 50
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {material.available > 100
                        ? "Good"
                        : material.available > 50
                        ? "Medium"
                        : "Low"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
