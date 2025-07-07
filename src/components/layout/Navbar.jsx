import React, { useState } from "react";
// import { usePathname } from "next/navigation"
import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = useNavigate();

  const navigation = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Products", to: "/products" },
    { name: "Workers", to: "/workers" },
    { name: "Contact", to: "/contact" },
  ];

  const isActive = (to) => {
    return pathname === to;
  };

  return (
    <header className="sticky top-0 z-50 w-full text-white bg-purple-600 border-b shadow-sm">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-yellow-300" />
            <span className="text-xl font-bold">Bajrang Latkan</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center hidden space-x-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`text-sm font-medium transition-colors hover:text-yellow-300 ${
                  isActive(item.to) ? "text-yellow-300" : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="items-center hidden space-x-4 md:flex">
            <Link to="/login" className="w-full">
              <Button
                variant="outline"
                className="text-white bg-transparent border-white hover:bg-white hover:text-purple-600"
              >
                Login
              </Button>
            </Link>
            <Button className="text-black bg-yellow-500 hover:bg-yellow-600">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-purple-700"
              >
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white p-5">
              <div className="flex flex-col mt-8 space-y-4">
                <Link to="/" className="flex items-center mb-8 space-x-2">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                  <span className="text-xl font-bold text-purple-600">
                    Bajrang Latkan
                  </span>
                </Link>

                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`text-lg font-medium transition-colors hover:text-purple-600 ${
                      isActive(item.to) ? "text-purple-600" : "text-gray-700"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="flex flex-col mt-8 space-y-4">
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="w-full text-purple-600 bg-transparent border-purple-600 hover:bg-purple-600 hover:text-white"
                    >
                      Login
                    </Button>
                  </Link>

                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
