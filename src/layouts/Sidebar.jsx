import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";

export function SidebarGroup({ item, collapsed, openGroup, setOpenGroup }) {
  const location = useLocation();
  const Icon = item.icon;

  const isParentActive = item.children?.some((child) =>
    location.pathname.startsWith(child.to)
  );

  const isOpen = openGroup === item.label;

  useEffect(() => {
    if (isParentActive) setOpenGroup(item.label);
  }, [isParentActive, setOpenGroup, item.label]);

  // Simple link (no children)
  if (!item.children) {
    return (
      <SidebarLink
        to={item.to}
        collapsed={collapsed}
        label={item.label}
        icon={<Icon className="w-5 h-5" />}
      />
    );
  }

  return (
    <div className="w-full">
      {/* Parent Button */}
      <button
        onClick={() => setOpenGroup(isOpen ? null : item.label)}
        className={`flex items-center w-full px-3 py-2.5 rounded-lg font-medium transition-all duration-200
          ${isOpen ? "bg-white/5 text-[#DC2626]" : "text-slate-300 hover:bg-white/5 hover:text-white"}
          ${collapsed ? "justify-center" : "justify-between"}
        `}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${isOpen ? "text-[#DC2626]" : "text-slate-400"}`} />
          {!collapsed && (
            <span className="flex items-center gap-2">
              {item.label}
              {isParentActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
              )}
            </span>
          )}
        </div>

        {!collapsed && (
          <span className={`transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`}>
            <ChevronDown size={16} className={isOpen ? "text-[#DC2626]" : "text-slate-500"} />
          </span>
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen && !collapsed ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="mt-1 ml-4 pl-4 border-l border-white/10 space-y-1">
          {item.children.map((child, idx) => (
            <SidebarChildLink key={idx} child={child} collapsed={collapsed} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SidebarChildLink({ child, collapsed }) {
  return (
    <NavLink
      to={child.to}
      end
      className={({ isActive }) => `
        flex items-center px-3 py-2 rounded-md font-medium text-sm transition-colors
        ${isActive
          ? "bg-[#DC2626]/10 text-[#DC2626]"
          : "text-slate-400 hover:text-white hover:bg-white/5"}
        ${collapsed ? "justify-center" : ""}
      `}
    >
      {!collapsed && child.label}
    </NavLink>
  );
}

function SidebarLink({ to, label, collapsed, icon }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) => `
        flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all
        ${isActive
          ? "bg-[#DC2626] text-white shadow-lg shadow-[#DC2626]/30"
          : "text-slate-300 hover:bg-white/5 hover:text-white"}
        ${collapsed ? "justify-center" : ""}
      `}
    >
      <span className={collapsed ? "" : "shrink-0"}>{icon}</span>
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  );
}
