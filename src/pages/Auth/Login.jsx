import React, { useState } from "react";
import { Eye, EyeOff, LogIn, Sparkles, User, Lock } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import { useAuthContext } from "@/context/AuthContext";

export default function LoginPage() {
  const { storeTokenInLS } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const router = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await api.login(formData);

      if (response.ok) {
        const res_data = await response.json();
        // console.log("Json Data :", res_data);
        if (res_data.msg === "Login successfully!") {
          // Store token and userId in localStorage
          storeTokenInLS(res_data.token);
          // Redirect to worker dashboard
          router("/");
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
    <div className="flex items-start justify-center min-h-screen p-4 mt-10 bg-bajrang-bg">
      <div className="w-full max-w-md">
        {/* Login Form */}
        <Card className="shadow-lg border-bajrang-border bg-bajrang-card">
          <CardHeader className="pb-6 space-y-1">
            <CardTitle className="flex items-center justify-center text-2xl text-center text-bajrang-text">
              <LogIn className="w-6 h-6 mr-2 text-bajrang-accent" />
              Worker Login
            </CardTitle>
            <CardDescription className="text-center text-bajrang-muted">
              Enter your credentials to access your account
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

              <div className="space-y-2">
                <Label htmlFor="email" className="text-bajrang-text">
                  Email Address
                </Label>
                <div className="relative">
                  <User className="absolute w-4 h-4 transform -translate-y-1/2 text-bajrang-muted left-3 top-1/2" />
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

              <div className="space-y-2">
                <Label htmlFor="password" className="text-bajrang-text">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute w-4 h-4 transform -translate-y-1/2 text-bajrang-muted left-3 top-1/2" />
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
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      handleChange("rememberMe", checked)
                    }
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm text-bajrang-muted"
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-bajrang-accent hover:text-bajrang-brand"
                >
                  Forgot password?
                </Link>
              </div>

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

            <div className="mt-6 text-center">
              <p className="text-bajrang-muted">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-bajrang-accent hover:text-bajrang-brand"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="p-4 mt-6 border rounded-lg border-bajrang-warning bg-yellow-50">
              <h4 className="mb-2 text-sm font-medium text-bajrang-warning">
                Demo Credentials:
              </h4>
              <p className="text-xs text-bajrang-text">
                Email: worker@bajranglatkan.com
                <br />
                Password: password123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
