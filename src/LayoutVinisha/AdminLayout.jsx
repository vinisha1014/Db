import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Navbar } from '../components';

function AdminLayout() {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get current location for active styling

  return (
    <div className="h-screen w-full flex gap-4 bg-gray-900 p-4 pt-20">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <div className="h-full w-1/5 bg-white rounded-2xl p-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-8">ERP-An Innovation</h1>
        <ul className="w-full flex flex-col gap-2">
          {[
            { path: "/dashboard/employee", label: "Employee" },
            { path: "/dashboard/payroll", label: "Payroll" },
            { path: "/dashboard/department", label: "Department" },
            { path: "/dashboard/inventory", label: "Inventory" },
            { path: "/dashboard/customer", label: "Customer" },
            { path: "/dashboard/supplier", label: "Supplier" },
            { path: "/dashboard/order", label: "Orders" },
            { path: "/dashboard/payrollview", label: "Employee Payroll" },
          ].map((item) => (
            <li key={item.path} className="w-full">
              <button
                onClick={() => navigate(item.path)} // Navigate to the path on click
                className={`flex w-full p-2 rounded-md ${
                  location.pathname === item.path ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="h-full w-4/5 bg-white rounded-2xl p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
