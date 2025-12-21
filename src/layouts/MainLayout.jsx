import { Outlet } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { NAV_ITEMS } from "./NavList";
import { Toaster } from "react-hot-toast";
import { SidebarGroup } from "./Sidebar";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false); // State for mobile drawer
  const [openGroup, setOpenGroup] = useState(null);

  const brandColor = "#31b8c6";

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gray-50">
      <Toaster/>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 h-full bg-white shadow-2xl flex flex-col transition-all duration-300 lg:static lg:shadow-lg
          ${collapsed ? "w-20" : "w-[280px]"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div
          className="p-4 flex items-center justify-between border-b text-white shrink-0"
          style={{ backgroundColor: brandColor }}
        >
          {(!collapsed || isMobileOpen) && (
            <h2 className="text-xl font-bold tracking-tight">{import.meta.env.VITE_APP_NAME}</h2>
          )}

          {/* Desktop Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded bg-white/20 hover:bg-white/30 transition hover:cursor-pointer "
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded bg-white/20 hover:bg-white/30"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
          {NAV_ITEMS.map((item, idx) => (
            <SidebarGroup
              key={idx}
              item={item}
              collapsed={collapsed && !isMobileOpen} // Don't collapse icons if it's the mobile drawer
              openGroup={openGroup}
              setOpenGroup={setOpenGroup}
            />
          ))}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center justify-center w-full gap-2 bg-red-500 text-white py-2.5 rounded-lg hover:bg-red-600 transition-colors font-medium">
            {(!collapsed || isMobileOpen) ? "Logout" : "⏻"}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-8 border-b shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              style={{ color: brandColor }}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-700 hidden sm:block">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900 leading-none">Admin User</p>
              <p className="text-xs text-gray-500 mt-1">Super Admin</p>
            </div>
            <img
              src="https://ui-avatars.com/api/?name=Admin&background=31b8c6&color=fff"
              className="w-10 h-10 rounded-full border-2 border-gray-100 object-cover"
              alt="Avatar"
            />
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}