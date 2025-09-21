import { ICONS } from "@/Icons/icons";

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
    icon: <ICONS.TARGET className="w-10 h-10 text-bajrang-accent" />,
    title: "Our Mission",
    desc: "To digitize and simplify latkan manufacturing with transparency, efficiency, and trust.",
  },
  {
    icon: <ICONS.FACTORY className="w-10 h-10 text-bajrang-secondary" />,
    title: "Our Vision",
    desc: "To be the trusted backbone for workers and families driving the handicraft industry.",
  },
  {
    icon: <ICONS.AWARD className="w-10 h-10 text-bajrang-success" />,
    title: "Our Values",
    desc: "Integrity, craftsmanship, and innovation that respects tradition and embraces progress.",
  },
];

//Work data

export const products = [
  { id: "1", name: "Hodi Latkan", rate: 7, unit: "packet" },
  { id: "2", name: "Fancy Latkan", rate: 10, unit: "packet" },
  { id: "3", name: "Spring Latkan", rate: 6, unit: "packet" },
  { id: "4", name: "Shivling Latkan", rate: 10, unit: "packet" },
  { id: "5", name: "Thingali Latkan", rate: 35, unit: "packet" },
];

//
export const workerstatusItem = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

export const salarystatusItem = [
  { label: "All Status", value: "all" },
  { label: "Pending", value: "Pending" },
  // { label: "Processing", value: "Processing" },
  { label: "Paid", value: "Paid" },
];

export const sidebarItems = [
  { icon: ICONS.HOME, label: "Dashboard", href: "/worker/dashboard" },
  {
    icon: ICONS.PACKAGE,
    label: "Assigned Work",
    href: "/worker/assigned-work",
  },
  { icon: ICONS.HISTORY, label: "Work History", href: "/worker/work-history" },
  {
    icon: ICONS.DOLLARSIGN,
    label: "Salary & Earnings",
    href: "/worker/salary",
  },
  { icon: ICONS.BELL, label: "Notifications", href: "/worker/notifications" },
  { icon: ICONS.USER, label: "Profile", href: "/worker/profile" },
  { icon: ICONS.HELPCIRCLE, label: "Help & Support", href: "/worker/help" },
];
