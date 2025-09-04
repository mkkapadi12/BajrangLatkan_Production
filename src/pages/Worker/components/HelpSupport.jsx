import { Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/hooks/useCallButton";

export function HelpSupport() {
  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Help & Support</CardTitle>
          <CardDescription>
            Get assistance and contact information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Emergency Contacts
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between px-3 rounded-lg bg-muted">
                  <div className="flex items-center p-3 space-x-3 ">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Supervisor</p>
                      <p className="text-sm text-muted-foreground">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>
                  <div>
                    <CallButton phoneNumber="+919313315902" />
                  </div>
                </div>
                <div className="flex items-center justify-between px-3 rounded-lg bg-muted">
                  <div className="flex items-center p-3 space-x-3 ">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">
                        Admin Office
                      </p>
                      <p className="text-sm text-muted-foreground">
                        +91 87654 32109
                      </p>
                    </div>
                  </div>
                  <div>
                    <CallButton phoneNumber="+919727434078" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Button className="w-full text-white bg-green-600 hover:bg-green-700">
                Contact via WhatsApp
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
