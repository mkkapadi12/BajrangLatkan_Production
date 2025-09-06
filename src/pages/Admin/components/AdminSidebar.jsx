import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { LogOut, X } from "lucide-react";
import { ICONS } from "@/Icons/icons";
import { sidebarItems } from "@/constant/AdminData";

export function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[260px] bg-bajrang-bg p-5 shadow-md rounded-r-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between">
            <Link to="/admin" className="block">
              <div className="flex items-center gap-3 group">
                {/* Icon */}
                <ICONS.SPARKLES className="w-7 h-7 text-bajrang-accent animate-spin" />

                {/* Brand Text */}
                <div className="flex flex-col leading-tight">
                  <span className="text-base font-bold tracking-wide transition-colors md:text-lg text-bajrang-brand group-hover:text-bajrang-warning">
                    Bajrang Latkan
                  </span>
                  <span className="text-sm font-medium tracking-wide text-gray-500">
                    Admin Dashboard
                  </span>
                </div>
              </div>
            </Link>

            {/* Close button (mobile only) */}
            <Button
              variant="ghost"
              size="icon"
              className="p-1.5 text-gray-500 transition-all rounded-full shadow-md lg:hidden hover:text-bajrang-brand hover:bg-bajrang-accent/10"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <Separator className="my-2" />

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="flex flex-col space-y-4">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link to={item.href}>
                      <button
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300",
                          isActive
                            ? "text-bajrang-brand bg-bajrang-accent/20 shadow-sm"
                            : "text-bajrang-text hover:text-bajrang-brand hover:bg-bajrang-accent/10"
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-5 h-5",
                            isActive ? "text-bajrang-brand" : "text-gray-500"
                          )}
                        />
                        <span>{item.title}</span>
                      </button>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="mt-10">
            <Link to="/admin/logout">
              <Button
                variant="outline"
                className="w-full font-medium transition-all duration-300 rounded-lg border-bajrang-brand text-bajrang-brand hover:bg-bajrang-brand hover:text-white"
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
