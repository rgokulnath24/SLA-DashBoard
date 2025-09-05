// Sidebar.jsx
import { NavLink } from "react-router-dom";
import { Users, Home, UserPlus, FileText, Calendar, Database } from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { path: "/Form", icon: <Users size={20} />, label: "Placement Form" },
    { path: "/Placement_Details", icon: <Calendar size={20} />, label: "Placement Details" },
    { path: "/Student_Form", icon: <UserPlus size={20} />, label: "Student Form" },
    { path: "/Student_Details", icon: <FileText size={20} />, label: "Student Details" },
    { path: "/Company_Info", icon: <Database size={20} />, label: "Company Details" },

    { path: "/", icon: <Home size={20} />, label: "Logout" },
  ];

  return (
    <div className="w-62 min-h-screen bg-gray-50 shadow-lg flex flex-col">
      {/* Logo / Header */}
      <div className="p-8 border-b">
        <img src="sla_logo.jpeg" alt="SLA" />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-3">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
