import {
  LayoutDashboard,
  Settings,
  Contact,
  Newspaper,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
  },
  {
    label: "Contacts",
    icon: Contact,
    to: "/contacts",
  },
  {
    label: "Newsletter",
    icon: Newspaper,
    to: "/newsletter",
  },
  {
    label: "Settings",
    icon: Settings,
    to: "/settings",
  },
];
