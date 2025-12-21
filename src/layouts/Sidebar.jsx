import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect } from "react";

const BRAND_COLOR = "#31b8c6";

export function SidebarGroup({ item, collapsed, openGroup, setOpenGroup }) {
  const location = useLocation();
  const Icon = item.icon;

  const isParentActive = item.children?.some(
    (child) => location.pathname.startsWith(child.to)
  );

  const isOpen = openGroup === item.label;

  // Auto-open group if a child route is active
  useEffect(() => {
    if (isParentActive) {
      setOpenGroup(item.label);
    }
  }, [isParentActive, setOpenGroup, item.label]);

  // If no children → simple link
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
          ${isOpen ? "bg-gray-50 text-[#31b8c6]" : "text-gray-600 hover:bg-gray-100"}
          ${collapsed ? "justify-center" : "justify-between"}
        `}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${isOpen ? "text-[#31b8c6]" : "text-gray-500"}`} />
          {!collapsed && (
            <span className="flex items-center gap-2">
              {item.label}
              {isParentActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#31b8c6]"></span>
              )}
            </span>
          )}
        </div>

        {!collapsed && (
          <span className={`transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`}>
             <ChevronDown size={16} className={isOpen ? "text-[#31b8c6]" : "text-gray-400"} />
          </span>
        )}
      </button>

   
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out
        ${isOpen && !collapsed ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
      `}
      >
        <div className="mt-1 ml-4 pl-4 border-l-2 border-gray-100 space-y-1">
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
          ? "bg-[#31b8c6]/10 text-[#31b8c6]" 
          : "text-gray-500 hover:text-[#31b8c6] hover:bg-gray-50"}
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
          ? "bg-[#31b8c6] text-white shadow-md shadow-[#31b8c6]/30" 
          : "text-gray-600 hover:bg-gray-100"}
        ${collapsed ? "justify-center" : ""}
      `}
    >
      <span className={collapsed ? "" : "shrink-0"}>{icon}</span>
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  );
}