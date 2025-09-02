import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { navigation } from "@/constant";
import { ICONS } from "@/Icons/icons";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { isLoggedIn, user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (to) => location.pathname === to;

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
            {navigation.map((item) => (
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
              <Link to="/logout">
                <Button
                  variant="outline"
                  className="border-bajrang-brand text-bajrang-brand hover:bg-bajrang-brand hover:text-white"
                >
                  Logout
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  className="transition-all border-bajrang-brand text-bajrang-brand hover:bg-bajrang-brand hover:text-white"
                >
                  Login
                </Button>
              </Link>
            )}
            <Link to="/get-started">
              <Button className="text-white bg-bajrang-accent hover:bg-bajrang-warning">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-bajrang-brand hover:bg-bajrang-brand hover:text-white"
              >
                <ICONS.MENU className="w-6 h-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-white p-5">
              <div className="flex flex-col mt-8 space-y-4">
                <Link to="/" className="flex items-center mb-8 space-x-2">
                  <ICONS.SPARKLES className="w-8 h-8 text-bajrang-brand" />
                  <span className="text-xl font-bold text-bajrang-brand">
                    Bajrang Latkan
                  </span>
                </Link>

                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors ${
                      isActive(item.to)
                        ? "text-accent"
                        : "text-gray-700 hover:text-bajrang-brand"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="flex flex-col mt-8 space-y-4">
                  {isLoggedIn ? (
                    <Link to="/logout">
                      <Button
                        variant="outline"
                        className="w-full border-bajrang-brand text-bajrang-brand hover:bg-bajrang-brand hover:text-white"
                      >
                        Logout
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/login">
                      <Button
                        variant="outline"
                        className="w-full border-bajrang-brand text-bajrang-brand hover:bg-bajrang-brand hover:text-white"
                      >
                        Login
                      </Button>
                    </Link>
                  )}

                  <Link to="/get-started">
                    <Button className="w-full text-white bg-accent hover:bg-warning">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
