import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useWorkContext } from "@/context/WorkContext";
import { useLoader } from "@/hooks/useLoader";
import toast from "react-hot-toast";
import { products } from "@/constant";
import { ADMINICONS } from "@/Icons/AdminIcons";
import { api } from "@/services/api";

export function SubmitWork() {
  const { adddailyWork } = useWorkContext();
  const [loading, setLoading] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [workDate, setWorkDate] = useState(new Date());
  const [workItems, setWorkItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workers, setWorkers] = useState([]);

  // Filters
  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [gender, setGender] = useState("all");
  const [status, setStatus] = useState("all");
  const [phone, setPhone] = useState("");

  const addWorkItem = () => {
    const newItem = {
      id: Date.now().toString(),
      productId: "",
      productName: "",
      rate: 0,
      packets: 0,
      totalAmount: 0,
      notes: "",
    };
    setWorkItems([...workItems, newItem]);
  };

  const removeWorkItem = (id) => {
    setWorkItems(workItems.filter((item) => item.id !== id));
  };

  const updateWorkItem = (id, field, value) => {
    setWorkItems(
      workItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          // Auto-calculate total amount when packets or rate changes
          if (field === "packets" || field === "rate") {
            updatedItem.totalAmount = updatedItem.packets * updatedItem.rate;
          }

          // Update product details when product is selected
          if (field === "productId") {
            const product = products.find((p) => p.id === value);
            if (product) {
              updatedItem.productName = product.name;
              updatedItem.rate = product.rate;
              updatedItem.totalAmount = updatedItem.packets * product.rate;
            }
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  const getTotalAmount = () => {
    return workItems.reduce((sum, item) => sum + item.totalAmount, 0);
  };

  const getTotalQuantity = () => {
    return workItems.reduce((sum, item) => sum + item.packets, 0);
  };

  const handleSubmit = async () => {
    if (
      !selectedWorker ||
      workItems.length === 0 ||
      workItems.some((item) => !item.productId || item.packets <= 0)
    ) {
      toast.error(
        "Please select a worker and add at least one work item and add valid quantities."
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Here you would typically send the data to your backend API
    await adddailyWork({
      workerId: selectedWorker,
      date: workDate.toLocaleDateString("en-CA"), // Format: YYYY-MM-DD
      products: workItems,
    });

    // Reset form
    setSelectedWorker("");
    setWorkItems([]);
    setWorkDate(new Date());
    setIsSubmitting(false);
  };

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const workersData = await api.getAllWorkers({
        name,
        village,
        gender,
        status,
        phone,
      });
      setWorkers(workersData.data);
    } catch (err) {
      console.error("Error fetching workers:", err);
    } finally {
      setLoading(false);
    }
  };
  const selectedWorkerData = workers?.find((w) => w._id === selectedWorker);

  useEffect(() => {
    fetchWorkers();
  }, [name, village, gender, phone, status]);


  return (
    <div className="space-y-6">
      {/* Header Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#7B1E3A]/10 rounded-lg">
                <ADMINICONS.USER className="h-5 w-5 text-[#7B1E3A]" />
              </div>
              <div>
                <p className="text-sm text-[#475569]">Selected Worker</p>
                <p className="font-semibold text-[#1E293B]">
                  {selectedWorkerData?.fullName || "None Selected"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#EFB700]/10 rounded-lg">
                <ADMINICONS.PACKAGE className="h-5 w-5 text-[#EFB700]" />
              </div>
              <div>
                <p className="text-sm text-[#475569]">Total Items</p>
                <p className="font-semibold text-[#1E293B]">
                  {getTotalQuantity()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#005B96]/10 rounded-lg">
                <ADMINICONS.CALCULATOR className="h-5 w-5 text-[#005B96]" />
              </div>
              <div>
                <p className="text-sm text-[#475569]">Total Amount</p>
                <p className="font-semibold text-[#1E293B]">
                  ₹{getTotalAmount()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1E293B]">
            Work Submission Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Worker and Date Selection */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="worker">Select Worker</Label>
              <Select value={selectedWorker} onValueChange={setSelectedWorker}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a worker" />
                </SelectTrigger>
                <SelectContent>
                  {workers.map((worker) => (
                    <SelectItem key={worker._id} value={worker._id}>
                      <div className="flex flex-col">
                        <span>{worker.fullName}</span>
                        {/* <span className="text-xs text-[#475569]">
                          Skills: {worker.skills.join(", ")}
                        </span> */}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Work Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !workDate && "text-muted-foreground"
                    )}
                  >
                    <ADMINICONS.CALENDAR className="w-4 h-4 mr-2" />
                    {workDate ? (
                      format(workDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={workDate}
                    onSelect={(date) => date && setWorkDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Worker Skills Display */}
          {selectedWorkerData && (
            <div className="p-4 bg-[#F8FAFC] rounded-lg">
              <p className="text-sm font-medium text-[#1E293B] mb-2">
                Worker Skills:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedWorkerData.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-[#7B1E3A]/10 text-[#7B1E3A]"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Work Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#1E293B]">
                Work Items
              </h3>
              <Button
                onClick={addWorkItem}
                size="sm"
                className="bg-[#7B1E3A] hover:bg-[#7B1E3A]/90"
              >
                <ADMINICONS.PLUS className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>

            {workItems.length === 0 ? (
              <div className="text-center py-8 text-[#475569]">
                <ADMINICONS.PACKAGE className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No work items added yet. Click "Add Item" to start.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {workItems.map((item, index) => (
                  <Card key={item.id} className="border-l-4 border-l-[#7B1E3A]">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-[#1E293B]">
                          Item #{index + 1}
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWorkItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <ADMINICONS.TRASH className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-2">
                          <Label>Product</Label>
                          <Select
                            value={item.productId}
                            onValueChange={(value) =>
                              updateWorkItem(item.id, "productId", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                            <SelectContent>
                              {products.map((product) => (
                                <SelectItem key={product.id} value={product.id}>
                                  <div className="flex flex-col">
                                    <span>{product.name}</span>
                                    <span className="text-xs text-[#475569]">
                                      ₹{product.rate}/{product.unit}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Rate per Item</Label>
                          <Input
                            type="number"
                            value={item.rate}
                            onChange={(e) =>
                              updateWorkItem(
                                item.id,
                                "rate",
                                Number.parseFloat(e.target.value) || 0
                              )
                            }
                            placeholder="0"
                            className="bg-[#F8FAFC]"
                            readOnly
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Quantity Made</Label>
                          <Input
                            type="number"
                            value={item.packets}
                            onChange={(e) =>
                              updateWorkItem(
                                item.id,
                                "packets",
                                Number.parseInt(e.target.value) || 0
                              )
                            }
                            placeholder="0"
                            min="0"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Notes (Optional)</Label>
                          <Textarea
                            value={item.notes}
                            onChange={(e) =>
                              updateWorkItem(item.id, "notes", e.target.value)
                            }
                            placeholder="Any additional notes about this work item..."
                            rows={2}
                          />
                        </div>

                        <div className="flex items-end">
                          <div className="p-3 bg-[#EFB700]/10 rounded-lg w-full">
                            <p className="text-sm text-[#475569]">
                              Total Amount
                            </p>
                            <p className="text-xl font-bold text-[#EFB700]">
                              ₹{item.totalAmount}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Summary and Submit */}
          {workItems.length > 0 && (
            <>
              <Separator />
              <div className="bg-[#F8FAFC] p-4 rounded-lg">
                <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
                  <div className="text-center">
                    <p className="text-sm text-[#475569]">Total Items</p>
                    <p className="text-2xl font-bold text-[#1E293B]">
                      {getTotalQuantity()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-[#475569]">Total Packets</p>
                    <p className="text-2xl font-bold text-[#1E293B]">
                      {workItems.reduce((sum, item) => sum + item.packets, 0)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-[#475569]">Total Payment</p>
                    <p className="text-2xl font-bold text-[#7B1E3A]">
                      ₹{getTotalAmount()}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting || !selectedWorker || workItems.length === 0
                  }
                  className="w-full bg-[#7B1E3A] hover:bg-[#7B1E3A]/90"
                  size="lg"
                >
                  <ADMINICONS.SAVE className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Submitting Work..." : "Submit Daily Work"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
