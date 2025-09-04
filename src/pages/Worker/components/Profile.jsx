import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockWorkerData = {
  name: "Rajesh Kumar",
  workerId: "WORKER01",
  profileImage: "/indian-worker-profile.jpg",
};

export function Profile() {
  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Profile Settings</CardTitle>
          <CardDescription>
            Manage your personal information and account settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={mockWorkerData.profileImage || "/placeholder.svg"}
                  alt={mockWorkerData.name}
                />
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                  {mockWorkerData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {mockWorkerData.name}
                </h3>
                <p className="text-muted-foreground">
                  Worker ID: {mockWorkerData.workerId}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                >
                  Change Photo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Edit Profile
              </Button>
              <Button variant="outline">Change Password</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
