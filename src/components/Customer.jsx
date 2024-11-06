import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Customer() {
  return (
    <div>
      {/* Tab */}
      <div id="tabContainer" className="w-full p-1 flex items-center gap-2">
        <NavLink
          to="upload"  // Relative path for nested routing
          className={({ isActive }) =>
            `inline-flex justify-center items-center px-4 py-2 rounded-lg ${
              isActive ? "bg-black text-white" : "bg-slate-100 hover:bg-black hover:text-white"
            }`
          }
        >
          Upload
        </NavLink>
        <NavLink
          to="view"  // Relative path for nested routing
          className={({ isActive }) =>
            `inline-flex justify-center items-center px-4 py-2 rounded-lg ${
              isActive ? "bg-black text-white" : "bg-slate-100 hover:bg-black hover:text-white"
            }`
          }
        >
          View
        </NavLink>
      </div>
      {/* Tab */}

      {/* ViewPort */}
      <div className="p-4">
        <Outlet /> {/* Nested routes render here */}
      </div>
      {/* ViewPort */}
    </div>
  );
}

export default Customer;
