import React from "react";
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-bajrang-brand text-bajrang-surface">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

      <div className="container relative px-6 py-16 mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-bajrang-accent" />
              <span className="text-xl font-bold text-white font-heading">
                Bajrang Latkan
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-bajrang-surfaceAlt">
              Leading the future of latkan manufacturing with innovative
              technology and traditional craftsmanship excellence.
            </p>
            <div className="flex pt-2 space-x-4">
              <Facebook className="w-5 h-5 transition-colors cursor-pointer text-bajrang-muted hover:text-bajrang-accent" />
              <Twitter className="w-5 h-5 transition-colors cursor-pointer text-bajrang-muted hover:text-bajrang-accent" />
              <Instagram className="w-5 h-5 transition-colors cursor-pointer text-bajrang-muted hover:text-bajrang-accent" />
              <Linkedin className="w-5 h-5 transition-colors cursor-pointer text-bajrang-muted hover:text-bajrang-accent" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-bajrang-accent">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Products", href: "/products" },
                { label: "Workers", href: "/workers" },
                { label: "Contact", href: "/contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors text-bajrang-surfaceAlt hover:text-bajrang-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-bajrang-accent">
              Services
            </h3>
            <ul className="space-y-2">
              {[
                "Worker Management",
                "Salary Management",
                "Product Selection",
                "Progress Tracking",
                "Business Analytics",
              ].map((service, idx) => (
                <li
                  key={idx}
                  className="text-sm transition-colors cursor-pointer text-bajrang-surfaceAlt hover:text-bajrang-accent"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-bajrang-accent">
              Contact Info
            </h3>
            <div className="space-y-3 text-sm text-bajrang-surfaceAlt">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-bajrang-accent" />
                <span>123 Craft Street, Mumbai</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-bajrang-accent" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-bajrang-accent" />
                <span>info@bajranglatkan.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 mt-12 text-center border-t border-bajrang-divider">
          <p className="text-sm text-bajrang-muted">
            © {new Date().getFullYear()} Bajrang Latkan. All rights reserved. |{" "}
            <Link to="/privacy" className="hover:text-bajrang-accent">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link to="/terms" className="hover:text-bajrang-accent">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
