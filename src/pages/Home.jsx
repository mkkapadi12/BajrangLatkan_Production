import React from "react";
import {
  ArrowRight,
  Users,
  Package,
  TrendingUp,
  Calculator,
  Clock,
  Shield,
  CheckCircle,
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
    <div className="min-h-screen bg-bajrang-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white bg-bajrang-brand">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative px-4 py-20 mx-auto text-center lg:py-32">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl font-heading">
            Transform Your <span className="text-bajrang-accent">Latkan Business</span>
          </h1>
          <p className="mb-8 text-xl text-bajrang-surface md:text-2xl">
            All-in-one platform to manage workers, track production, analyze profits & grow.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="font-semibold text-bajrang-text bg-bajrang-accent hover:bg-yellow-500 shadow-gold"
            >
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border text-bajrang-brand border-bajrang-surface hover:bg-bajrang-surface hover:text-bajrang-brand"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-bajrang-surface">
        <div className="container max-w-6xl px-4 mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold text-bajrang-text">Why Bajrang Latkan?</h2>
          <p className="max-w-3xl mx-auto text-lg text-bajrang-textSecondary">
            For decades, the latkan industry has relied on manual work, paperwork, and guesswork. 
            Bajrang Latkan changes this — bringing modern tools, real-time tracking, and powerful analytics 
            to empower traditional craftsmanship with technology.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 mx-auto bg-bajrang-surfaceAlt">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-bajrang-text md:text-4xl">
              Comprehensive Business Management
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-bajrang-textSecondary">
              Everything you need to manage your latkan business efficiently and profitably.
            </p>
          </div>

          <div className="grid gap-8 px-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Users className="w-12 h-12 mb-4 text-bajrang-brand" />, title: "Worker Management", desc: "Track worker details, skills, experience, and performance metrics" },
              { icon: <Calculator className="w-12 h-12 mb-4 text-bajrang-brand" />, title: "Salary Management", desc: "Automated salary calculations and payment tracking" },
              { icon: <Package className="w-12 h-12 mb-4 text-bajrang-brand" />, title: "Product Selection", desc: "Manage latkan varieties, designs, and inventory" },
              { icon: <TrendingUp className="w-12 h-12 mb-4 text-bajrang-brand" />, title: "Profit & Loss Analysis", desc: "Comprehensive financial analytics and reporting" },
              { icon: <Clock className="w-12 h-12 mb-4 text-bajrang-brand" />, title: "Progress Tracking", desc: "Monitor production progress and deadlines" },
              { icon: <Shield className="w-12 h-12 mb-4 text-bajrang-brand" />, title: "Business Intelligence", desc: "Data-driven insights for better decision making" },
            ].map((card, idx) => (
              <Card key={idx} className="transition-shadow border border-bajrang-border hover:shadow-soft">
                <CardHeader>
                  {card.icon}
                  <CardTitle className="text-xl text-bajrang-text">{card.title}</CardTitle>
                  <CardDescription className="text-bajrang-textSecondary">{card.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-bajrang-surface">
        <div className="container max-w-6xl px-4 mx-auto text-center">
          <h2 className="mb-12 text-3xl font-bold text-bajrang-text">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "Add Workers & Products", desc: "Set up your team, product catalog, and workflow in minutes." },
              { step: "2", title: "Track & Manage", desc: "Monitor progress, assign work, and calculate salaries automatically." },
              { step: "3", title: "Grow with Insights", desc: "Analyze profits, reduce costs, and make data-driven decisions." },
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-bajrang-surfaceAlt rounded-xl shadow-soft">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-lg font-bold text-white rounded-full bg-bajrang-brand">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-bajrang-text">{item.title}</h3>
                <p className="mt-2 text-bajrang-textSecondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 text-white bg-bajrang-brand">
        <div className="container max-w-5xl px-4 mx-auto text-center">
          <h2 className="mb-12 text-3xl font-bold">Trusted by Latkan Businesses</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: "Rajesh Kumar", feedback: "Managing salaries and workers was a nightmare before. Bajrang Latkan made it easy and transparent." },
              { name: "Meena Handicrafts", feedback: "Our production efficiency improved by 40% after adopting this platform." },
              { name: "Omkar Exports", feedback: "Finally, a software designed for our industry. Simple, powerful, and effective." },
            ].map((t, idx) => (
              <div key={idx} className="p-6 shadow-lg bg-white/10 rounded-xl">
                <p className="mb-4 italic">“{t.feedback}”</p>
                <h4 className="font-semibold">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center bg-bajrang-accent">
        <div className="container max-w-4xl px-4 mx-auto">
          <h2 className="mb-4 text-3xl font-bold text-bajrang-brand">Start Growing with Bajrang Latkan</h2>
          <p className="mb-8 text-lg text-bajrang-text">
            Modernize your latkan business with tools built for manufacturers like you.
          </p>
          <Button size="lg" className="font-semibold text-white shadow-lg bg-bajrang-brand hover:bg-bajrang-bg">
            Start Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
}
