import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminHeader } from "../components/AdminHeader";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../components/AdminSidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarProvider className="flex h-screen bg-[#F8FAFC]">
      {/* Admin Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
