import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight, Menu, X, LogOut } from "lucide-react";
import { NAV_ITEMS } from "./NavList";
import { SidebarGroup } from "./Sidebar";
import { clearUser } from "../store/authSlice";
import NotificationBell from "../components/NotificationBell";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.email?.split("@")[0] ||
    "Admin User";

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-slate-900 text-white">
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 h-full bg-[#0c0c0c] border-r border-white/10 flex flex-col transition-all duration-300 lg:static
          ${collapsed ? "w-20" : "w-[280px]"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div
          className={`h-16 px-4 flex items-center border-b border-white/10 shrink-0 ${
            collapsed && !isMobileOpen ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src="/Logo-A/3.png"
              alt="AaradhyArtist"
              className="w-10 h-10 rounded-xl object-cover shrink-0"
            />
            {(!collapsed || isMobileOpen) && (
              <span className="text-lg font-black tracking-tighter uppercase whitespace-nowrap">
                Aaradhy<span className="text-[#DC2626]">Artist</span>
              </span>
            )}
          </div>

          {/* Desktop Toggle — hidden when collapsed (moved below to avoid overlap) */}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="hidden lg:flex p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition hover:cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {/* Mobile Close */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Expand button — only shown when collapsed, on its own row so it never overlaps the logo */}
        {collapsed && !isMobileOpen && (
          <div className="hidden lg:flex justify-center py-2 border-b border-white/10">
            <button
              onClick={() => setCollapsed(false)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition hover:cursor-pointer"
              title="Expand sidebar"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
          {NAV_ITEMS.map((item, idx) => (
            <SidebarGroup
              key={idx}
              item={item}
              collapsed={collapsed && !isMobileOpen}
              openGroup={openGroup}
              setOpenGroup={setOpenGroup}
            />
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full gap-2 bg-[#DC2626] text-white py-2.5 rounded-lg hover:bg-[#b91c1c] transition-colors font-semibold text-sm"
          >
            <LogOut size={18} />
            {(!collapsed || isMobileOpen) && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-[#0c0c0c] border-b border-white/10 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 rounded-lg text-[#DC2626] hover:bg-white/5"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-bold text-white hidden sm:block">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <NotificationBell />
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white leading-none">{displayName}</p>
              <p className="text-xs text-slate-400 mt-1 capitalize">{user?.role || "Admin"}</p>
            </div>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=DC2626&color=fff&bold=true`}
              className="w-10 h-10 rounded-full border border-white/10 object-cover"
              alt="Avatar"
            />
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 bg-slate-900">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
