import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sidebarItems, WorkerSidebar } from "../components/WorkerSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/AuthContext";

export function WorkerDashboardLayout() {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen bg-bajrang-bg">
        {/* Sidebar */}
        <WorkerSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top Bar */}
          <header className="flex items-center justify-between px-6 py-2 border-b shadow-md bg-gradient-to-r from-bajrang-brand/90 to-bajrang-accent/80 border-bajrang-brand/30">
            {/* Left Section */}
            <div className="flex items-center space-x-3">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="text-white transition-all duration-300 rounded-full lg:hidden hover:bg-white/20"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>

              <h1 className="text-xl font-extrabold text-white drop-shadow-md">
                {sidebarItems.find((item) => item.id === activeTab)?.label ||
                  "Dashboard"}
              </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              {/* Quick Stats */}
              <div className="items-center hidden space-x-6 text-white sm:flex">
                <div className="flex flex-col items-center px-3 py-1 rounded-lg shadow-sm bg-white/10">
                  <span className="text-lg font-bold">12</span>
                  <span className="text-xs opacity-90">Tasks</span>
                </div>
                <div className="flex flex-col items-center px-3 py-1 rounded-lg shadow-sm bg-white/10">
                  <span className="text-lg font-bold">₹850</span>
                  <span className="text-xs opacity-90">Earnings</span>
                </div>
              </div>

              {/* Worker Profile */}
              <div className="flex items-center px-3 py-2 space-x-3 transition-all duration-300 bg-white shadow-md cursor-pointer rounded-xl hover:shadow-lg">
                <Avatar className="w-10 h-10 transition-all duration-300 cursor-pointer md:w-12 md:h-12 ring-2 ring-bajrang-accent hover:ring-bajrang-warning">
                  <AvatarImage
                    src={user?.profileImage}
                    alt="profile"
                    className="object-cover w-full h-full rounded-full"
                  />
                  <AvatarFallback className="text-lg font-semibold text-bajrang-brand bg-bajrang-accent/20">
                    {user?.fullName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-col hidden leading-tight lg:flex">
                  <span className="text-sm font-bold text-bajrang-brand">
                    {user?.fullName || "User"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {user?.workerId}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-3 overflow-auto md:p-6 bg-bajrang-bg">
            <div className="w-full p-4 bg-white shadow-md rounded-2xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
