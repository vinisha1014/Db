import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createContext, useState } from "react";

import Employee from "./components/Employee";
import DepartmentUpload from "./components/DepartmentUpload";
import AdminLayout from "./LayoutVinisha/AdminLayout";
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
import EmployeePayrollView from "./components/EmployeePayroll";
import PayrollCalculators from "./components/PayrollCalculator";
import NotFound from './components/molecules/NotFound'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./config/redux/store";


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
        <Provider store={store}>
        <payrollContext.Provider value={{ payrolls, setPayrolls }}>
        <customerContext.Provider value={{ customers, setCustomers }}>
        <orderContext.Provider value={{ orders, setOrders }}>
        <inventoryContext.Provider value={{ inventories, setInventories }}>
        <supplierContext.Provider value={{ suppliers, setSuppliers }}>
        <employeeContext.Provider value={{ employees, setEmployees }}>
            <departmentContext.Provider value={{ departments, setDepartments }}>
                <BrowserRouter>
                    <Routes>
                    <Route path='/' element={<Home />} />
      <Route path='/tentang' element={<About />} />
      <Route path='/kontak' element={<Contact />} />
      <Route path='/login' element={ <Login />} />

      {/* Route Not Found 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />
                        {/* <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} /> */}
                        <Route  path="/dashboard" element={<AdminLayout />}>
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
                                <Route path="calculator" element={<PayrollCalculators />} />
                            </Route>
                            <Route path="payrollview" element={<EmployeePayrollView/>}/>
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
        </Provider>
    );
}

export default App;
