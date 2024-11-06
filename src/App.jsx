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
import Department from "./components/Department";
import DepartmentView from "./components/DepartmentView";
import Order from "./components/Order";
import OrderUpload from "./components/OrderUpload";
import OrderView from "./components/OrderView";
import Customer from "./components/Customer";
import CustomerUpload from "./components/CustomerUpload";
import CustomerView from "./components/CustomerView";
import PayrollUpload from "./components/PayrollUpload";
import PayrollView from "./components/PayrollView";
import Payroll from "./components/Payroll";

export const employeeContext = createContext();
export const departmentContext = createContext();
export const supplierContext = createContext();
export const inventoryContext = createContext();
export const orderContext = createContext();
export const customerContext = createContext();
export const payrollContext = createContext();

function App() {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [suppliers,setSuppliers] = useState([]);
    const [inventories, setInventories] = useState([]);
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [payrolls, setPayrolls] = useState([]);


    return (
        <payrollContext.Provider value={{ payrolls, setPayrolls }}>
        <customerContext.Provider value={{ customers, setCustomers }}>
        <orderContext.Provider value={{ orders, setOrders }}>
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

                            <Route path="department" element={<Department />} >
                                
                                <Route index element={<DepartmentUpload />} />
                                <Route path="upload" element={<DepartmentUpload />} />
                                <Route path="view" element={<DepartmentView />} />

                            </Route>
                            {/* order routes */}
                            <Route path="order" element={<Order />}>
                                <Route index element={<OrderUpload />} />
                                <Route path="upload" element={<OrderUpload />} />
                                <Route path="view" element={<OrderView />} />
                                </Route>
                            {/* customer routes */}
                            <Route path="customer" element={<Customer />}>
                                <Route index element={<CustomerUpload />} />
                                <Route path="upload" element={<CustomerUpload />} />
                                <Route path="view" element={<CustomerView />} />

                            </Route>
                            {/* payroll routes */}
                            <Route path="payroll" element={<Payroll />}>
                                <Route index element={<PayrollUpload />} />
                                <Route path="upload" element={<PayrollUpload />} />
                                <Route path="view" element={<PayrollView />} />
                            </Route>

                        </Route>
                    </Routes>
                </BrowserRouter>
            </departmentContext.Provider>
        </employeeContext.Provider>
        </supplierContext.Provider>
        </inventoryContext.Provider>
        </orderContext.Provider>
        </customerContext.Provider>
        </payrollContext.Provider>
    );
}

export default App;
