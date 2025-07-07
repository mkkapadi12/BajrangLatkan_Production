import React from "react";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function ContactPage() {
  useDocumentTitle("Contact Bajrang Latkan - Get in Touch with Us");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Hero Section */}
      <section className="py-20 text-white bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Contact <span className="text-yellow-300">Bajrang Latkan</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-purple-100">
              Get in touch with us for any questions, support, or business
              inquiries
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="p-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 mb-16 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center border-purple-100">
              <CardHeader>
                <MapPin className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <CardTitle className="text-xl">Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  123 Craft Street
                  <br />
                  Artisan Quarter
                  <br />
                  Mumbai, Maharashtra 400001
                  <br />
                  India
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-100">
              <CardHeader>
                <Phone className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <CardTitle className="text-xl">Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  <strong>Main:</strong> +91 98765 43210
                  <br />
                  <strong>Sales:</strong> +91 98765 43211
                  <br />
                  <strong>Support:</strong> +91 98765 43212
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-100">
              <CardHeader>
                <Mail className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <CardTitle className="text-xl">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  <strong>General:</strong> info@bajranglatkan.com
                  <br />
                  <strong>Sales:</strong> sales@bajranglatkan.com
                  <br />
                  <strong>Support:</strong> support@bajranglatkan.com
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-100">
              <CardHeader>
                <Clock className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <CardTitle className="text-xl">Business Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  <strong>Mon - Fri:</strong> 9:00 AM - 6:00 PM
                  <br />
                  <strong>Saturday:</strong> 9:00 AM - 2:00 PM
                  <br />
                  <strong>Sunday:</strong> Closed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Send Us a Message
              </h2>
              <p className="text-xl text-gray-600">
                We'd love to hear from you. Fill out the form below and we'll
                get back to you as soon as possible.
              </p>
            </div>

            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Contact Form
                </CardTitle>
                <CardDescription className="text-center">
                  Please provide your details and we'll respond within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select
                        onValueChange={(value) =>
                          handleChange("subject", value)
                        }
                        required
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="sales">Sales & Pricing</SelectItem>
                          <SelectItem value="support">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="partnership">
                            Partnership
                          </SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your inquiry in detail..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-purple-50">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Visit Our Location
            </h2>
            <p className="text-xl text-gray-600">
              Come visit us at our manufacturing facility and showroom
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-0 border-purple-100">
              <CardContent className="p-0">
                <div className="flex items-center justify-center bg-gray-200 rounded-lg h-96">
                  <div className="text-center text-gray-600">
                    <MapPin className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-semibold">Interactive Map</p>
                    <p>123 Craft Street, Artisan Quarter, Mumbai</p>
                    <p className="mt-2 text-sm">
                      Map integration would be implemented here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg">
                  What types of latkans do you manufacture?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We manufacture a wide variety of latkans including decorative
                  pieces, festival ornaments, traditional designs, and custom
                  orders. Our skilled craftsmen can create both simple and
                  intricate designs based on your requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg">
                  How does your management system work?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our comprehensive management system tracks worker performance,
                  manages salaries, monitors production progress, and provides
                  detailed analytics for profit and loss analysis. It's designed
                  specifically for latkan manufacturing businesses.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg">
                  Do you offer training for the system?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, we provide comprehensive training for all users of our
                  management system. This includes initial setup, daily
                  operations, and advanced features. We also offer ongoing
                  support to ensure smooth operations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg">
                  What are your minimum order quantities?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Minimum order quantities vary depending on the type and
                  complexity of the latkan design. Please contact our sales team
                  with your specific requirements for detailed information and
                  pricing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
