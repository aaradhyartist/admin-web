
import {
  LayoutDashboard,
  FolderKanban,
  User,
  Users,
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
    label: "Projects",
    icon: FolderKanban,
    children: [
      { label: "All Projects", to: "/projects" },
      { label: "Create Project", to: "/projects/create" },
      { label: "Archived", to: "/projects/archived" },
    ],
  },
  {
    label: "Users",
    icon: Users,
    children: [
      { label: "All Users", to: "/users" },
      { label: "Roles", to: "/users/roles" },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    to: "/settings",
  },
    {
    label: "Contacts",
    icon: Contact,
    to: "/contacts",
  },
   {
    label: "NewsLetter",
    icon: Newspaper,
    to: "/newsletter",
  },
];
