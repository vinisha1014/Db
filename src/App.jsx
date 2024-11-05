import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createContext, useState } from "react";
import Login from "./components/Login";
import Employee from "./components/Employee";
import DepartmentUpload from "./components/DepartmentUpload"; // Import your DepartmentUpload component
import AdminLayout from "./Layout/AdminLayout";
import EmployeeUpload from "./components/EmployeeUpload";
import EmployeeView from "./components/EmployeeView";

export const employeeContext = createContext();
export const departmentContext = createContext();

function App() {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]); // New state for departments
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <employeeContext.Provider value={{ employees, setEmployees }}>
            <departmentContext.Provider value={{ departments, setDepartments }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={
                            isLoggedIn ? <Navigate to="/" /> : <Login />
                        } />
                        <Route path="/" element={
                            isLoggedIn ? <AdminLayout /> : <Navigate to="/login" />
                        }>
                            <Route index element={<Employee />} /> {/* Main Employee Route */}
                            <Route path="employee/upload" element={<EmployeeUpload />} />
                            <Route path="employee/view" element={<EmployeeView />} />
                            <Route path="department" element={<DepartmentUpload />} /> {/* New department route */}
                        </Route>
                    </Routes>
                </BrowserRouter>
            </departmentContext.Provider>
        </employeeContext.Provider>
    );
}

export default App;
