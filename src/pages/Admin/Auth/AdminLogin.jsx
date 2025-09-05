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
import { useAdminContext } from "@/context/AdminContext";
import { ICONS } from "@/Icons/icons";
import { api } from "@/services/api";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { storeTokenInLS } = useAdminContext();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const response = await api.adminLogin(formData); // make sure you create this API endpoint

      if (response.ok) {
        const res_data = await response.json();
        if (res_data.msg === "Admin login successful!") {
          storeTokenInLS(res_data.token);
          router("/admin"); // redirect to admin dashboard
        } else {
          setError(res_data.msg || "Login failed. Please try again.");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Login failed. Please try again.");
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
        {/* Admin Login Form */}
        <Card className="shadow-lg border-bajrang-border bg-bajrang-card">
          <CardHeader className="pb-6 space-y-1">
            <CardTitle className="flex items-center justify-center text-2xl text-center text-bajrang-text">
              <ICONS.ADMIN className="w-6 h-6 mr-2 text-bajrang-accent" />
              Admin Login
            </CardTitle>
            <CardDescription className="text-center text-bajrang-muted">
              Sign in with your admin credentials
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

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-bajrang-text">
                  Email Address
                </Label>
                <div className="relative">
                  <ICONS.USER className="absolute w-4 h-4 transform -translate-y-1/2 text-bajrang-muted left-3 top-1/2" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter admin email"
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
                    placeholder="Enter password"
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

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full text-white bg-bajrang-brand hover:bg-bajrang-accent"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Back to worker login */}
            <div className="mt-6 text-center">
              <p className="text-bajrang-muted">
                Not an admin?{" "}
                <Link
                  to="/login"
                  className="font-medium text-bajrang-accent hover:text-bajrang-brand"
                >
                  Go to Worker Login
                </Link>
              </p>
            </div>

            {/* Demo Admin Credentials */}
            <div className="p-4 mt-6 border rounded-lg border-bajrang-warning bg-yellow-50">
              <h4 className="mb-2 text-sm font-medium text-bajrang-warning">
                Demo Admin Credentials:
              </h4>
              <p className="text-xs text-bajrang-text">
                Email: admin@bajranglatkan.com
                <br />
                Password: admin123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
