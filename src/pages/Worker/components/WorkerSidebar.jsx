import React from "react";
import {
  Home,
  Package,
  DollarSign,
  Bell,
  User,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ICONS } from "@/Icons/icons";
import { Separator } from "@/components/ui/separator";

const sidebarItems = [
  { icon: Home, label: "Dashboard", id: "dashboard" },
  { icon: Package, label: "Assigned Work", id: "work" },
  { icon: DollarSign, label: "Salary & Earnings", id: "salary" },
  { icon: Bell, label: "Notifications", id: "notifications" },
  { icon: User, label: "Profile", id: "profile" },
  { icon: HelpCircle, label: "Help & Support", id: "help" },
];

export function WorkerSidebar({
  activeTab,
  onTabChange,
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] bg-bajrang-bg p-5 shadow-md rounded-r-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between mb-2">
            <Link to="/" className="flex items-center space-x-2 group">
              <ICONS.SPARKLES className="w-8 h-8 text-bajrang-accent animate-spin" />
              <span className="text-lg font-extrabold tracking-wide transition-colors md:text-xl text-bajrang-brand">
                Bajrang Latkan
              </span>
            </Link>

            {/* Close button (Mobile only) */}
            <Button
              variant="ghost"
              size="icon"
              className="p-2 text-gray-500 transition-all rounded-full shadow-md lg:hidden hover:text-bajrang-brand hover:bg-bajrang-accent/10"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <Separator className="my-4" />

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="flex flex-col space-y-5">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <Link to={`/worker/${item.id}`}>
                    <button
                      onClick={() => {
                        onTabChange(item.id);
                        setSidebarOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-lg font-semibold transition-all duration-300",
                        activeTab === item.id
                          ? "text-bajrang-brand bg-bajrang-accent/20 shadow-sm"
                          : "text-bajrang-text hover:text-bajrang-brand hover:bg-bajrang-accent/10"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "w-5 h-5",
                          activeTab === item.id
                            ? "text-bajrang-brand"
                            : "text-gray-500"
                        )}
                      />
                      <span>{item.label}</span>
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="mt-10 space-y-4">
            <Link to="/logout">
              <Button
                variant="outline"
                className="w-full font-semibold transition-all duration-300 rounded-lg border-bajrang-brand text-bajrang-brand hover:bg-bajrang-brand hover:text-white"
              >
                <LogOut className="w-5 h-5 mr-2" /> Logout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export { sidebarItems };
