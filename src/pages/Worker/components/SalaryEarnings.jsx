import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/Button";

export function SalaryEarnings() {
  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Salary & Earnings</CardTitle>
          <CardDescription>
            Track your monthly earnings and payment history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Current Month Earnings
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <span className="text-foreground">Beaded Items</span>
                  <span className="font-semibold text-secondary">₹2,000</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <span className="text-foreground">Thread Work</span>
                  <span className="font-semibold text-secondary">₹1,500</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <span className="text-foreground">Embroidery</span>
                  <span className="font-semibold text-secondary">₹1,000</span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-foreground">
                      Total
                    </span>
                    <span className="text-xl font-bold text-primary">
                      ₹4,500
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Payment Information
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">
                    Next Payment Date
                  </p>
                  <p className="font-semibold text-foreground">
                    5th January 2024
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">
                    Payment Method
                  </p>
                  <p className="font-semibold text-foreground">Bank Transfer</p>
                </div>
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Download Salary Slip
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
