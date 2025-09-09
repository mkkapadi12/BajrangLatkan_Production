import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICONS } from "@/Icons/icons";
import { api } from "@/services/api";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    adminname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // console.log(formData);

      const response = await api.adminSignup(formData);

      if (response.ok) {
        const res_data = await response.json();
        if (res_data.msg === "Admin registered successfully!") {
          router("/admin/login"); // redirect to login page
        } else {
          setError(res_data.msg || "Signup failed. Please try again.");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-bajrang-bg">
      <div className="w-full max-w-md">
        {/* Signup Form */}
        <Card className="shadow-lg border-bajrang-border bg-bajrang-card">
          <CardHeader className="pb-6 space-y-1">
            <CardTitle className="flex items-center justify-center text-2xl text-center text-bajrang-text">
              <ICONS.USERPLUS className="w-6 h-6 mr-2 text-bajrang-accent" />
              Admin Signup
            </CardTitle>
            <CardDescription className="text-center text-bajrang-muted">
              Create your admin account to manage the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="border-bajrang-danger bg-red-50">
                  <AlertDescription className="text-bajrang-danger">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="adminname" className="text-bajrang-text">
                  Full Name
                </Label>
                <div className="relative">
                  <ICONS.USER className="absolute w-4 h-4 transform -translate-y-1/2 text-bajrang-muted left-3 top-1/2" />
                  <Input
                    id="adminname"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.adminname}
                    onChange={(e) => handleChange("adminname", e.target.value)}
                    className="pl-10 border-bajrang-border focus:border-bajrang-accent"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-bajrang-text">
                  Email Address
                </Label>
                <div className="relative">
                  <ICONS.MAIL className="absolute w-4 h-4 transform -translate-y-1/2 text-bajrang-muted left-3 top-1/2" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="pl-10 border-bajrang-border focus:border-bajrang-accent"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-bajrang-text">
                  Password
                </Label>
                <div className="relative">
                  <ICONS.LOCK className="absolute w-4 h-4 transform -translate-y-1/2 text-bajrang-muted left-3 top-1/2" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="pl-10 pr-10 border-bajrang-border focus:border-bajrang-accent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute transform -translate-y-1/2 text-bajrang-muted right-3 top-1/2 hover:text-bajrang-text"
                  >
                    {showPassword ? (
                      <ICONS.EYEOFF className="w-4 h-4" />
                    ) : (
                      <ICONS.EYE className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-bajrang-text">
                  Confirm Password
                </Label>
                <div className="relative">
                  <ICONS.LOCK className="absolute w-4 h-4 transform -translate-y-1/2 text-bajrang-muted left-3 top-1/2" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleChange("confirmPassword", e.target.value)
                    }
                    className="pl-10 border-bajrang-border focus:border-bajrang-accent"
                    required
                  />
                </div>
              </div>

              {/* Signup Button */}
              <Button
                type="submit"
                className="w-full text-white bg-bajrang-brand hover:bg-bajrang-accent"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                    Creating account...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-bajrang-muted">
                Already have an account?{" "}
                <Link
                  to="/admin/login"
                  className="font-medium text-bajrang-accent hover:text-bajrang-brand"
                >
                  Login here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSignup;
