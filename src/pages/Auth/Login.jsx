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
import toast from "react-hot-toast";

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

    // Simulate API call
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
          // toast.success("Login successful!");
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
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-50 to-white">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center mb-6 space-x-2">
            <Sparkles className="w-10 h-10 text-purple-600" />
            <span className="text-2xl font-bold text-purple-800">
              Bajrang Latkan
            </span>
          </Link>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your worker account</p>
        </div>

        {/* Login Form */}
        <Card className="border-purple-100 shadow-lg">
          <CardHeader className="pb-6 space-y-1">
            <CardTitle className="flex items-center justify-center text-2xl text-center">
              <LogIn className="w-6 h-6 mr-2 text-purple-600" />
              Employee Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <User className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
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
                  <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-purple-600 hover:text-purple-800"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
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
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-purple-600 hover:text-purple-800"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="p-4 mt-6 border border-yellow-200 rounded-lg bg-yellow-50">
              <h4 className="mb-2 text-sm font-medium text-yellow-800">
                Demo Credentials:
              </h4>
              <p className="text-xs text-yellow-700">
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
