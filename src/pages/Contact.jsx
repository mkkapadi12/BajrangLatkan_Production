import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Contact() {
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
    console.log("Form submitted:", formData);
    toast.success("Your message has been sent!");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-bajrang-bg">
      {/* Hero Section */}
      <section className="py-20 text-center text-white bg-bajrang-brand">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="container px-4 mx-auto"
        >
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            Contact <span className="text-bajrang-accent">Bajrang Latkan</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-bajrang-surfaceAlt">
            We’re here to help with your questions, support needs, or business
            inquiries.
          </p>
        </motion.div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid gap-5 mb-16 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: (
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-bajrang-brand" />
                ),
                title: "Address",
                content: (
                  <>
                    123 Craft Street <br /> Artisan Quarter <br /> Surat,
                    Gujarat 400001 ,India
                  </>
                ),
              },
              {
                icon: (
                  <Phone className="w-12 h-12 mx-auto mb-4 text-bajrang-brand" />
                ),
                title: "Phone",
                content: (
                  <>
                    <strong>Main:</strong> +91 98765 43210 <br />
                    <strong>Sales:</strong> +91 98765 43211 <br />
                    <strong>Support:</strong> +91 98765 43212
                  </>
                ),
              },
              {
                icon: (
                  <Mail className="w-12 h-12 mx-auto mb-4 text-bajrang-brand" />
                ),
                title: "Email",
                content: (
                  <>
                    <strong>General:</strong> info@bajranglatkan.com <br />
                    <strong>Sales:</strong> sales@bajranglatkan.com <br />
                    <strong>Support:</strong> support@bajranglatkan.com
                  </>
                ),
              },
              {
                icon: (
                  <Clock className="w-12 h-12 mx-auto mb-4 text-bajrang-brand" />
                ),
                title: "Business Hours",
                content: (
                  <>
                    <strong>Mon - Fri:</strong> 9:00 AM - 6:00 PM <br />
                    <strong>Saturday:</strong> 9:00 AM - 2:00 PM <br />
                    <strong>Sunday:</strong> Closed
                  </>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <Card className="text-center transition shadow-md border-bajrang-border hover:shadow-lg">
                  <CardHeader>
                    {item.icon}
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-2">
                    <p className="text-bajrang-textSecondary">{item.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="shadow-md border-bajrang-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form and we’ll respond within 24 hours.
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
                        <SelectTrigger>
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
                      placeholder="Please describe your inquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full font-semibold transition bg-bajrang-accent text-bajrang-brand hover:bg-bajrang-warning"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-bajrang-surfaceAlt">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="container px-4 mx-auto"
        >
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-bajrang-text md:text-4xl">
              Visit Our Location
            </h2>
            <p className="text-lg text-bajrang-textSecondary">
              Come visit us at our manufacturing facility and showroom
            </p>
          </div>

          <Card className="max-w-4xl py-0 mx-auto shadow-md border-bajrang-border">
            <CardContent className="p-0">
              <div className="flex items-center justify-center bg-gray-200 rounded-lg h-96">
                <div className="text-center text-bajrang-textSecondary">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-bajrang-brand" />
                  <p className="text-lg font-semibold">Interactive Map</p>
                  <p>123 Craft Street, Artisan Quarter, Mumbai</p>
                  <p className="mt-2 text-sm">Map integration coming soon.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
