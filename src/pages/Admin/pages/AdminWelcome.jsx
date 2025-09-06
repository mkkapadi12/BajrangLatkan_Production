import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { ICONS } from "@/Icons/icons";
import { useAdminContext } from "@/context/AdminContext";
import { useLoader } from "@/hooks/useLoader";

export default function AdminWelcome() {
  const { admin, loading } = useAdminContext();
  const navigate = useNavigate();

  if (loading) {
    return useLoader();
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-r from-bajrang-brand/90 to-bajrang-accent/80">
      <div className="w-full max-w-3xl">
        {/* Welcome Header */}
        <div className="mb-8 text-center">
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl text-bajrang-text">
            👋 Welcome Back, {admin?.adminname}!
          </h1>
          <p className="mt-2 text-bajrang-surface">
            Manage production, workers, and performance at Bajrang Latkan
          </p>
        </div>

        {/* Info Card */}
        <Card className="shadow-lg border-bajrang-border bg-bajrang-card">
          <CardHeader className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex items-center space-x-4 ">
              <Avatar className="w-16 h-16 ring-2 ring-bajrang-accent">
                <AvatarImage src={admin?.photo} alt={admin?.adminname} />
                <AvatarFallback className="text-lg text-white bg-bajrang-accent">
                  {admin?.adminname
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl font-semibold text-bajrang-text">
                  {admin?.adminname}
                </CardTitle>
                <p className="text-sm text-bajrang-surface">{admin?.email}</p>
                <p className="mt-1 text-xs font-medium text-bajrang-brand">
                  {admin?.role}
                </p>
              </div>
            </div>
            <Button
              onClick={() => navigate("/admin/dashboard")}
              className="px-6 py-2 mt-4 text-white bg-bajrang-brand hover:bg-bajrang-accent sm:mt-0"
            >
              <ICONS.DASHBOARD className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
            <div className="p-4 bg-white border rounded-lg shadow-sm border-bajrang-border">
              <h3 className="font-medium text-bajrang-text">Quick Actions</h3>
              <p className="mt-1 text-sm text-bajrang-textSecondary">
                Assign work, verify production, or check worker stats.
              </p>
              <Button
                size="sm"
                className="mt-3 text-white bg-bajrang-accent hover:bg-bajrang-warning"
              >
                Manage Workers
              </Button>
            </div>
            <div className="p-4 bg-white border rounded-lg shadow-sm border-bajrang-border">
              <h3 className="font-medium text-bajrang-text">Reports</h3>
              <p className="mt-1 text-sm text-bajrang-textSecondary">
                View monthly reports, performance, and production insights.
              </p>
              <Button
                size="sm"
                className="mt-3 text-white bg-bajrang-accent hover:bg-bajrang-warning"
              >
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
