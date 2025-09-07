import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { desktopNavigation, mobileNavigation } from "@/constant";
import { ICONS } from "@/Icons/icons";
import { Button } from "@/components/ui/Button";
import { showUserToast } from "@/Toast/customToast";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Navbar() {
  const { isLoggedIn, user, token } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // console.log("User in Navbar:", user);

  const isActive = (to) => location.pathname === to;

  useEffect(() => {
    if (user && isLoggedIn) {
      showUserToast(user);
    }
  }, [user]);

  return (
    <header className="sticky top-0 z-50 w-full mx-auto border-b shadow-sm border-bajrang-border bg-bajrang-bg">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ICONS.SPARKLES className="w-8 h-8 text-bajrang-brand" />
            <span className="text-xl font-bold text-bajrang-brand">
              Bajrang Latkan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center hidden space-x-8 md:flex">
            {desktopNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.to)
                    ? "text-bajrang-accent"
                    : "text-bajrang-text hover:text-bajrang-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="items-center hidden space-x-4 md:flex">
            {isLoggedIn ? (
              <Menubar className="!bg-white !border-none">
                <MenubarMenu className="!border-none !bg-none !hover:bg-none">
                  <MenubarTrigger className="!p-0 !bg-white">
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
                  </MenubarTrigger>

                  <MenubarContent className="bg-white shadow-xl rounded-2xl min-w-[200px] py-3 border border-bajrang-divider">
                    {/* User Info */}
                    <div className="px-4 py-2 text-center border-b border-bajrang-divider">
                      <p className="text-xs text-bajrang-text">Hello 👋</p>
                      <p className="font-semibold text-bajrang-brand">
                        {user?.fullName}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <Link to="/profile">
                      <MenubarItem className="flex items-center gap-2 px-4 py-2 transition-all rounded-lg cursor-pointer hover:!bg-bajrang-accent/10 hover:!text-bajrang-accent">
                        👤 My Profile
                      </MenubarItem>
                    </Link>

                    <Link to="/worker/dashboard">
                      <MenubarItem className="flex items-center gap-2 px-4 py-2 transition-all rounded-lg cursor-pointer hover:!bg-bajrang-accent/10 hover:!text-bajrang-accent">
                        ⚙️ Dashboard
                      </MenubarItem>
                    </Link>

                    <MenubarSeparator className="my-2 border-bajrang-divider" />

                    <Link to="/logout">
                      <MenubarItem className="flex items-center gap-2 px-4 py-2 text-red-500 transition-all rounded-lg cursor-pointer hover:!bg-red-100 hover:!text-red-600">
                        🚪 Logout
                      </MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            ) : (
              <>
                {/* Login Button */}
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="px-5 py-2 transition-all shadow-sm border-bajrang-brand text-bajrang-brand hover:bg-bajrang-brand hover:text-white rounded-xl"
                  >
                    Login
                  </Button>
                </Link>

                {/* Get Started Button */}
                <Link to="/get-started">
                  <Button className="px-5 py-2 text-white transition-all shadow-sm rounded-xl bg-bajrang-accent hover:bg-bajrang-warning">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="transition-all duration-300 rounded-full shadow-md text-bajrang-brand hover:bg-bajrang-brand hover:text-white"
              >
                <ICONS.MENU className="w-6 h-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[280px] bg-bajrang-bg p-6 shadow-2xl rounded-l-2xl"
            >
              {/* Logo */}
              <div className="flex items-center mb-10 space-x-3">
                <ICONS.SPARKLES className="w-8 h-8 text-bajrang-accent animate-spin-slow" />
                <span className="text-xl font-extrabold tracking-wide text-bajrang-brand">
                  Bajrang Latkan
                </span>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-5">
                {mobileNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-semibold transition-all duration-300 px-3 py-2 rounded-lg ${
                      isActive(item.to)
                        ? "text-bajrang-brand bg-bajrang-accent/20 shadow-sm"
                        : "text-bajrang-text hover:text-bajrang-brand hover:bg-bajrang-accent/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col mt-3 space-y-4">
                {isLoggedIn ? (
                  <div className="flex flex-col mt-12 space-y-4">
                    <Link to="/worker/dashboard">
                      <Button
                        variant="outline"
                        className="w-full font-semibold transition-all duration-300 rounded-lg border-bajrang-brand text-bajrang-brand hover:bg-bajrang-brand hover:text-white"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <Link to="/logout">
                      <Button
                        variant="outline"
                        className="w-full font-semibold transition-all duration-300 rounded-lg border-bajrang-brand text-bajrang-brand hover:bg-bajrang-brand hover:text-white"
                        onClick={() => setIsOpen(false)}
                      >
                        Logout
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="w-full font-semibold transition-all duration-300 rounded-lg border-bajrang-brand text-bajrang-brand hover:bg-bajrang-brand hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>
                )}

                <Link to="/get-started">
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="w-full font-semibold text-white transition-all duration-300 rounded-lg shadow-md bg-bajrang-accent hover:bg-yellow-500"
                  >
                    🚀 Get Started
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
