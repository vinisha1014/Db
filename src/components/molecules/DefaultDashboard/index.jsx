import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Layout from '../../../LayoutVinisha';
import { CardOne, CardTwo, CardThree, CardFour, ChartOne, ChartTwo, Breadcrumb } from '../../../components';
import axios from "axios";

const DefaultDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [employeeData, setEmployeeData] = useState(null);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/data_employee/name/${user.employee_name}`
                );
                setEmployeeData(response.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        if (user?.access_level === "employee") {
            fetchEmployeeData();
        }
    }, [user]);

    return (
        <Layout>
            <Breadcrumb pageName="Dashboard" />

            {user?.access_level === "admin" && (
                <>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                        <CardOne />
                        <CardTwo />
                        <CardThree />
                        <CardFour />
                    </div>

                    <div className="mt-4 grid grid-cols-12 gap-6 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                        <div className="col-span-12 sm:col-span-7">
                            <ChartOne />
                        </div>
                        <div className="col-span-12 sm:col-span-5">
                            <ChartTwo />
                        </div>
                    </div>
                </>
            )}

            {user?.access_level === "employee" && employeeData && (
                <>
                    <div className="mt-6 text-center md:text-left">
                        <h2 className="px-4 py-2 text-meta-3 font-medium">
                            Welcome to ERP Innovation! You are logged in as an Employee.
                        </h2>
                    </div>

                    <div className="py-2 px-4 md:px-6 text-lg">
                        <h3 className="font-medium text-black dark:text-white text-center md:text-left">
                            Employee Information
                        </h3>
                    </div>

                    <div className="flex flex-col md:flex-row rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-2">
                        <div className="md:w-1/3 w-full px-4 py-4 flex justify-center md:justify-start">
                            <img
                                className="rounded-xl h-80 w-full md:w-80 object-cover"
                                src={`http://localhost:5000/images/${employeeData.photo}`}
                                alt="Employee"
                            />
                        </div>
                        <div className="md:w-2/3 px-4 md:px-20 py-4 md:py-20">
                            <div className="w-full md:text-lg">
                                <h2 className="font-medium mb-4 text-black dark:text-white">
                                    <span className="inline-block w-32 md:w-40">Employee ID</span> : {employeeData.nik}
                                </h2>
                                <h2 className="font-medium mb-4 text-black dark:text-white">
                                    <span className="inline-block w-32 md:w-40">Employee Name</span> : {employeeData.employee_name}
                                </h2>
                                <h2 className="font-medium mb-4 text-black dark:text-white">
                                    <span className="inline-block w-32 md:w-40">Joining Date</span> : {employeeData.join_date}
                                </h2>
                                <h2 className="font-medium mb-4 text-black dark:text-white">
                                    <span className="inline-block w-32 md:w-40">Position</span> : {employeeData.position}
                                </h2>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Layout>
    );
};

export default DefaultDashboard;
