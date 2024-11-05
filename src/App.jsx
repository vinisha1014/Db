import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createContext, useState } from "react";
import Login from "./components/Login";
import Employee from "./components/Employee";
import DepartmentUpload from "./components/DepartmentUpload";
import AdminLayout from "./Layout/AdminLayout";
import EmployeeUpload from "./components/EmployeeUpload";
import EmployeeView from "./components/EmployeeView";
import Supplier from "./components/Supplier";
import SupplierUpload from "./components/SupplierUpload";
import SupplierView from "./components/SupplierView";
import Inventory from "./components/Inventory";
import InventoryUpload from "./components/InventoryUpload";
import InventoryView from "./components/InventoryView";

export const employeeContext = createContext();
export const departmentContext = createContext();
export const supplierContext = createContext();
export const inventoryContext = createContext();

function App() {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [suppliers,setSuppliers] = useState([]);
    const [inventories, setInventories] = useState([]);

    return (
        <inventoryContext.Provider value={{ inventories, setInventories }}>
        <supplierContext.Provider value={{ suppliers, setSuppliers }}>
        <employeeContext.Provider value={{ employees, setEmployees }}>
            <departmentContext.Provider value={{ departments, setDepartments }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
                        <Route path="/" element={isLoggedIn ? <AdminLayout /> : <Navigate to="/login" />}>
                            <Route index element={<Navigate to="employee" />} /> {/* Redirect to Employee by default */}
                            <Route path="employee" element={<Employee />}>
                                <Route index element={<EmployeeUpload />} /> {/* Default to Upload */}
                                <Route path="upload" element={<EmployeeUpload />} />
                                <Route path="view" element={<EmployeeView />} />
                            </Route>
                            <Route path="supplier" element={<Supplier />}>
                                <Route index element={<SupplierUpload />} /> {/* Default to Upload */}
                                <Route path="upload" element={<SupplierUpload />} />
                                <Route path="view" element={<SupplierView />} />
                            </Route>
                            <Route path="inventory" element={<Inventory />}>
                                <Route index element={<InventoryUpload />} />
                                <Route path="upload" element={<InventoryUpload />} />
                                <Route path="view" element={<InventoryView />} />
                            </Route>

                            <Route path="department" element={<DepartmentUpload />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </departmentContext.Provider>
        </employeeContext.Provider>
        </supplierContext.Provider>
        </inventoryContext.Provider>
    );
}

export default App;
