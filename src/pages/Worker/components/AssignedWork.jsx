import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const mockAssignedWork = [
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
  {
    id: 4,
    product: "Embroidered Patches",
    quantity: 25,
    deadline: "2024-01-22",
    status: "Pending",
    completed: 0,
  },
];

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

export function AssignedWork() {
  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Assigned Work</CardTitle>
          <CardDescription>
            Manage your current assignments and track progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAssignedWork.map((work) => (
              <div
                key={work.id}
                className="p-4 border rounded-lg border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">
                    {work.product}
                  </h3>
                  <Badge className={getStatusColor(work.status)}>
                    {work.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 gap-4 mb-3 md:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-medium text-foreground">
                      {work.quantity} pieces
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Deadline</p>
                    <p className="font-medium text-foreground">
                      {work.deadline}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="font-medium text-foreground">
                      {work.completed}/{work.quantity}
                    </p>
                  </div>
                </div>
                <Progress
                  value={(work.completed / work.quantity) * 100}
                  className="mb-3"
                />
                {work.status !== "Completed" && (
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {work.status === "Pending"
                      ? "Start Work"
                      : "Update Progress"}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
