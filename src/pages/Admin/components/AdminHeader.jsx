import React from "react";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ADMINICONS } from "@/Icons/AdminIcons";
import { Input } from "@/components/ui/input";
import { useAdminContext } from "@/context/AdminContext";
import { Link } from "react-router-dom";

export function AdminHeader({ setSidebarOpen }) {
  const { admin } = useAdminContext();

  return (
    <header className="bg-white border-b border-[#E2E8F0] px-6 py-4">
      <div className="flex items-center justify-between gap-2">
        {/* Mobile menu button */}
        <Button
          variant="outline"
          size="sm"
          className="transition-all duration-300 rounded-md text-bajrang-brand lg:hidden hover:bg-white/20"
          onClick={() => setSidebarOpen(true)}
        >
          <ADMINICONS.MENU className="w-6 h-6" />
        </Button>
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <ADMINICONS.SEARCH className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] h-4 w-4" />
            <Input
              type="search"
              placeholder="Search workers, tasks, materials..."
              className="w-full pl-10 pr-4 py-2 border border-[#E2E8F0] rounded-lg focus:!outline-none focus:!ring-1 focus:!ring-[#7B1E3A] focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button
            variant="outline"
            size="icon"
            className="relative hover:!bg-bajrang-accent"
          >
            <ADMINICONS.BELL className="h-5 w-5 text-[#475569]" />
            <span className="absolute -top-1 -right-1 bg-[#DC2626] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-3 px-2 py-3 transition-all rounded-lg hover:bg-bajrang-accent/10 focus:ring-1 focus:ring-bajrang-accent sm:px-4 sm:py-5"
              >
                {/* Avatar */}
                <Avatar className="w-6 h-6 transition-all duration-300 cursor-pointer md:w-8 md:h-8 ring-2 ring-bajrang-accent hover:ring-bajrang-warning">
                  <AvatarImage src="/admin-avatar.png" />
                  <AvatarFallback className="text-sm font-bold text-bajrang-brand bg-bajrang-accent/20 md:text-lg">
                    {admin?.adminname
                      ? admin.adminname.charAt(0).toUpperCase()
                      : "A"}
                  </AvatarFallback>
                </Avatar>

                {/* Name + Email */}
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold text-[#1E293B] truncate max-w-[120px] md:max-w-[160px]">
                    {admin?.adminname || "Admin User"}
                  </p>
                  <p className="text-xs text-[#64748B] truncate max-w-[140px] md:max-w-[200px]">
                    {admin?.email || "admin@bajranglatkan.com"}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>

            {/* Dropdown Content */}
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-56 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <DropdownMenuLabel className="font-semibold text-bajrang-brand">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <Link to="/admin/profile">
                <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md hover:!bg-bajrang-accent/10 !text-bajrang-brand">
                  <ADMINICONS.USER className="w-4 h-4" />
                  Profile
                </DropdownMenuItem>
              </Link>

              <Link to="/admin/settings">
                <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md hover:!bg-bajrang-accent/10 !text-bajrang-brand">
                  <ADMINICONS.SETTINGS className="w-4 h-4" />
                  Settings
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />
              <Link to="/admin/logout">
                <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 !text-red-600 rounded-md hover:!bg-red-50">
                  <ADMINICONS.LOGOUT className="w-4 h-4" />
                  Logout
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
