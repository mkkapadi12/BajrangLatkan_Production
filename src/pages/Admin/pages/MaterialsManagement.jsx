import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Package,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

const mockMaterials = [
  {
    id: "1",
    name: "Golden Thread",
    category: "Thread",
    currentStock: 500,
    unit: "meters",
    minThreshold: 100,
    maxCapacity: 1000,
    costPerUnit: 25,
    supplier: "Thread Suppliers Ltd",
    lastRestocked: "2024-01-15",
    status: "good",
  },
  {
    id: "2",
    name: "Silver Beads",
    category: "Beads",
    currentStock: 45,
    unit: "grams",
    minThreshold: 50,
    maxCapacity: 200,
    costPerUnit: 150,
    supplier: "Bead Craft Co",
    lastRestocked: "2024-01-10",
    status: "low",
  },
  {
    id: "3",
    name: "Red Fabric",
    category: "Fabric",
    currentStock: 15,
    unit: "meters",
    minThreshold: 20,
    maxCapacity: 100,
    costPerUnit: 80,
    supplier: "Fabric House",
    lastRestocked: "2024-01-05",
    status: "critical",
  },
  {
    id: "4",
    name: "Decorative Stones",
    category: "Accessories",
    currentStock: 150,
    unit: "pieces",
    minThreshold: 50,
    maxCapacity: 300,
    costPerUnit: 5,
    supplier: "Stone Crafts",
    lastRestocked: "2024-01-20",
    status: "good",
  },
];

export function MaterialsManagement() {
  const [materials, setMaterials] = useState(mockMaterials);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.supplier.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || material.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "good":
        return "bg-[#16A34A] text-white";
      case "low":
        return "bg-[#EFB700] text-white";
      case "critical":
        return "bg-[#DC2626] text-white";
      case "out-of-stock":
        return "bg-[#94A3B8] text-white";
      default:
        return "bg-[#94A3B8] text-white";
    }
  };

  const getStockPercentage = (current, max) => {
    return (current / max) * 100;
  };

  const handleAddMaterial = (formData) => {
    const newMaterial = {
      id: Date.now().toString(),
      name: formData.get("name"),
      category: formData.get("category"),
      currentStock: Number(formData.get("currentStock")),
      unit: formData.get("unit"),
      minThreshold: Number(formData.get("minThreshold")),
      maxCapacity: Number(formData.get("maxCapacity")),
      costPerUnit: Number(formData.get("costPerUnit")),
      supplier: formData.get("supplier"),
      lastRestocked: new Date().toISOString().split("T")[0],
      status: "good",
    };
    setMaterials([...materials, newMaterial]);
    setIsAddDialogOpen(false);
  };

  const totalValue = materials.reduce(
    (acc, material) => acc + material.currentStock * material.costPerUnit,
    0
  );
  const lowStockCount = materials.filter(
    (m) => m.status === "low" || m.status === "critical"
  ).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Raw Materials</h1>
          <p className="text-[#475569]">
            Manage inventory and track material usage
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#7B1E3A] hover:bg-[#7B1E3A]/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Material
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form action={handleAddMaterial}>
              <DialogHeader>
                <DialogTitle>Add New Material</DialogTitle>
                <DialogDescription>
                  Enter the details of the new material to add to inventory.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select name="category" required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Thread">Thread</SelectItem>
                      <SelectItem value="Beads">Beads</SelectItem>
                      <SelectItem value="Fabric">Fabric</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="currentStock" className="text-right">
                    Stock
                  </Label>
                  <Input
                    id="currentStock"
                    name="currentStock"
                    type="number"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="unit" className="text-right">
                    Unit
                  </Label>
                  <Input
                    id="unit"
                    name="unit"
                    placeholder="meters, grams, pieces"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="minThreshold" className="text-right">
                    Min Threshold
                  </Label>
                  <Input
                    id="minThreshold"
                    name="minThreshold"
                    type="number"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="maxCapacity" className="text-right">
                    Max Capacity
                  </Label>
                  <Input
                    id="maxCapacity"
                    name="maxCapacity"
                    type="number"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="costPerUnit" className="text-right">
                    Cost/Unit (₹)
                  </Label>
                  <Input
                    id="costPerUnit"
                    name="costPerUnit"
                    type="number"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="supplier" className="text-right">
                    Supplier
                  </Label>
                  <Input
                    id="supplier"
                    name="supplier"
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-[#7B1E3A] hover:bg-[#7B1E3A]/90"
                >
                  Add Material
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
                <p className="text-[#475569] text-sm font-medium">
                  Total Materials
                </p>
                <p className="text-2xl font-bold text-[#1E293B]">
                  {materials.length}
                </p>
              </div>
              <Package className="h-8 w-8 text-[#7B1E3A]" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">
                  Total Value
                </p>
                <p className="text-2xl font-bold text-[#1E293B]">
                  ₹{totalValue.toLocaleString()}
                </p>
              </div>
              <div className="w-8 h-8 bg-[#16A34A]/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-[#16A34A]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">
                  Low Stock Items
                </p>
                <p className="text-2xl font-bold text-[#DC2626]">
                  {lowStockCount}
                </p>
              </div>
              <div className="w-8 h-8 bg-[#DC2626]/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-[#DC2626]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#475569] text-sm font-medium">Categories</p>
                <p className="text-2xl font-bold text-[#1E293B]">
                  {new Set(materials.map((m) => m.category)).size}
                </p>
              </div>
              <div className="w-8 h-8 bg-[#EFB700]/10 rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-[#EFB700]" />
              </div>
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
                placeholder="Search materials by name, category, or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="good">Good Stock</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Materials Table */}
      <Card className="border-[#E2E8F0]">
        <CardHeader>
          <CardTitle className="text-[#1E293B]">Materials Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Restocked</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-[#1E293B]">
                          {material.name}
                        </p>
                        <p className="text-sm text-[#475569]">
                          {material.category}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            {material.currentStock} {material.unit}
                          </span>
                          <span className="text-[#475569]">
                            {getStockPercentage(
                              material.currentStock,
                              material.maxCapacity
                            ).toFixed(0)}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              material.status === "good"
                                ? "bg-[#16A34A]"
                                : material.status === "low"
                                ? "bg-[#EFB700]"
                                : "bg-[#DC2626]"
                            }`}
                            style={{
                              width: `${getStockPercentage(
                                material.currentStock,
                                material.maxCapacity
                              )}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-[#94A3B8]">
                          Min: {material.minThreshold}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          ₹{material.costPerUnit}/{material.unit}
                        </p>
                        <p className="text-sm text-[#475569]">
                          Total: ₹
                          {(
                            material.currentStock * material.costPerUnit
                          ).toLocaleString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{material.supplier}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(material.status)}>
                        {material.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">
                        {new Date(material.lastRestocked).toLocaleDateString()}
                      </p>
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
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Material
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Package className="w-4 h-4 mr-2" />
                            Restock
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Material
                          </DropdownMenuItem>
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
    </div>
  );
}
