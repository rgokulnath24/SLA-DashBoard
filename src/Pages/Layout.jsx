// Layout.jsx
import Navbar from "./Navbar";
import Sidebar from "./SideNavbar";
 
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar on left */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1">
        <Navbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
