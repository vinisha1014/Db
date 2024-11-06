import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="h-screen w-full flex gap-4 bg-gray-900 p-4">
      {/* Sidebar */}
      <div className="h-full w-1/5 bg-white rounded-2xl p-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-8">ERP-An Innovation</h1>
        <ul className="w-full flex flex-col gap-2">
          {[
            { path: "/", label: "Employee" },
            { path: "/Payroll", label: "Payroll" },
            { path: "/department", label: "Department" },
            { path: "/inventory", label: "Inventory" },
            { path: "/customer", label: "Customer" },
            {path: "/supplier", label: "Supplier"},
            { path: "/order", label: "Orders" }
          ].map((item) => (
            <li key={item.path} className="w-full">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex w-full p-2 rounded-md ${
                    isActive ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
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
