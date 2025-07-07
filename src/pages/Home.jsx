import React from "react";
import { ArrowRight, Users, Package, TrendingUp, Calculator, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function HomePage() {
  useDocumentTitle("Bajrang Latkan - Complete Business Management Solution for Latkan Manufacturing");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-yellow-300">Bajrang Latkan</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Complete Business Management Solution for Latkan Manufacturing
            </p>
            <p className="text-lg mb-10 text-purple-200 max-w-2xl mx-auto">
              Streamline your operations with our comprehensive platform for managing workers, tracking production,
              analyzing profits, and growing your latkan business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-800 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Business Management</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your latkan business efficiently and profitably
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-20">
            <Card className="hover:shadow-lg transition-shadow border-purple-100">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-xl">Worker Management</CardTitle>
                <CardDescription>Track worker details, skills, experience, and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Employee profiles and skills tracking</li>
                  <li>• Performance monitoring</li>
                  <li>• Work assignment management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-purple-100">
              <CardHeader>
                <Calculator className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-xl">Salary Management</CardTitle>
                <CardDescription>Automated salary calculations and payment tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Automated salary calculations</li>
                  <li>• Payment history tracking</li>
                  <li>• Bonus and incentive management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-purple-100">
              <CardHeader>
                <Package className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-xl">Product Selection</CardTitle>
                <CardDescription>Manage latkan varieties, designs, and inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Product catalog management</li>
                  <li>• Inventory tracking</li>
                  <li>• Design specifications</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-purple-100">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-xl">Profit & Loss Analysis</CardTitle>
                <CardDescription>Comprehensive financial analytics and reporting</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Real-time profit tracking</li>
                  <li>• Cost analysis reports</li>
                  <li>• Revenue forecasting</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-purple-100">
              <CardHeader>
                <Clock className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-xl">Progress Tracking</CardTitle>
                <CardDescription>Monitor production progress and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Production timeline tracking</li>
                  <li>• Milestone management</li>
                  <li>• Quality control checkpoints</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-purple-100">
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-xl">Business Intelligence</CardTitle>
                <CardDescription>Data-driven insights for better decision making</CardDescription>
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
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Products Managed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Active Workers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">99%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">System Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Join hundreds of successful latkan businesses using our platform to streamline operations and boost profits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-800 bg-transparent"
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
