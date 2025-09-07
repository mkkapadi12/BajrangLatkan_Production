import { Factory, Target, Award } from "lucide-react";

export const desktopNavigation = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Products", to: "/products" },
  { name: "Contact", to: "/contact" },
];

export const mobileNavigation = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Products", to: "/products" },
  { name: "Contact", to: "/contact" },
];

//About.jsx content

export const aboutData = [
  {
    icon: <Target className="w-10 h-10 text-bajrang-accent" />,
    title: "Our Mission",
    desc: "To digitize and simplify latkan manufacturing with transparency, efficiency, and trust.",
  },
  {
    icon: <Factory className="w-10 h-10 text-bajrang-secondary" />,
    title: "Our Vision",
    desc: "To be the trusted backbone for workers and families driving the handicraft industry.",
  },
  {
    icon: <Award className="w-10 h-10 text-bajrang-success" />,
    title: "Our Values",
    desc: "Integrity, craftsmanship, and innovation that respects tradition and embraces progress.",
  },
];
