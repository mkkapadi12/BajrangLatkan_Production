import React from "react";
import {
  ArrowRight,
  Users,
  Package,
  TrendingUp,
  Calculator,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function HomePage() {
  useDocumentTitle(
    "Bajrang Latkan - Complete Business Management Solution for Latkan Manufacturing"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container relative px-4 py-20 mx-auto lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Welcome to <span className="text-yellow-300">Bajrang Latkan</span>
            </h1>
            <p className="mb-8 text-xl text-purple-100 md:text-2xl">
              Complete Business Management Solution for Latkan Manufacturing
            </p>
            <p className="max-w-2xl mx-auto mb-10 text-lg text-purple-200">
              Streamline your operations with our comprehensive platform for
              managing workers, tracking production, analyzing profits, and
              growing your latkan business.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="font-semibold text-black bg-yellow-500 hover:bg-yellow-600"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white bg-transparent border-white hover:bg-white hover:text-purple-800"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Comprehensive Business Management
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Everything you need to manage your latkan business efficiently and
              profitably
            </p>
          </div>

          <div className="grid gap-8 px-20 md:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-shadow border-purple-100 hover:shadow-lg">
              <CardHeader>
                <Users className="w-12 h-12 mb-4 text-purple-600" />
                <CardTitle className="text-xl">Worker Management</CardTitle>
                <CardDescription>
                  Track worker details, skills, experience, and performance
                  metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Employee profiles and skills tracking</li>
                  <li>• Performance monitoring</li>
                  <li>• Work assignment management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="transition-shadow border-purple-100 hover:shadow-lg">
              <CardHeader>
                <Calculator className="w-12 h-12 mb-4 text-purple-600" />
                <CardTitle className="text-xl">Salary Management</CardTitle>
                <CardDescription>
                  Automated salary calculations and payment tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Automated salary calculations</li>
                  <li>• Payment history tracking</li>
                  <li>• Bonus and incentive management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="transition-shadow border-purple-100 hover:shadow-lg">
              <CardHeader>
                <Package className="w-12 h-12 mb-4 text-purple-600" />
                <CardTitle className="text-xl">Product Selection</CardTitle>
                <CardDescription>
                  Manage latkan varieties, designs, and inventory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Product catalog management</li>
                  <li>• Inventory tracking</li>
                  <li>• Design specifications</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="transition-shadow border-purple-100 hover:shadow-lg">
              <CardHeader>
                <TrendingUp className="w-12 h-12 mb-4 text-purple-600" />
                <CardTitle className="text-xl">
                  Profit & Loss Analysis
                </CardTitle>
                <CardDescription>
                  Comprehensive financial analytics and reporting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Real-time profit tracking</li>
                  <li>• Cost analysis reports</li>
                  <li>• Revenue forecasting</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="transition-shadow border-purple-100 hover:shadow-lg">
              <CardHeader>
                <Clock className="w-12 h-12 mb-4 text-purple-600" />
                <CardTitle className="text-xl">Progress Tracking</CardTitle>
                <CardDescription>
                  Monitor production progress and deadlines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Production timeline tracking</li>
                  <li>• Milestone management</li>
                  <li>• Quality control checkpoints</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="transition-shadow border-purple-100 hover:shadow-lg">
              <CardHeader>
                <Shield className="w-12 h-12 mb-4 text-purple-600" />
                <CardTitle className="text-xl">Business Intelligence</CardTitle>
                <CardDescription>
                  Data-driven insights for better decision making
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Performance dashboards</li>
                  <li>• Trend analysis</li>
                  <li>• Predictive analytics</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-purple-50">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 text-center md:grid-cols-4">
            <div>
              <div className="mb-2 text-4xl font-bold text-purple-600">
                500+
              </div>
              <div className="text-gray-600">Products Managed</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-purple-600">50+</div>
              <div className="text-gray-600">Active Workers</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-purple-600">99%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-purple-600">
                24/7
              </div>
              <div className="text-gray-600">System Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to Transform Your Business?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-purple-100">
            Join hundreds of successful latkan businesses using our platform to
            streamline operations and boost profits.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="font-semibold text-black bg-yellow-500 hover:bg-yellow-600"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white bg-transparent border-white hover:bg-white hover:text-purple-800"
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
