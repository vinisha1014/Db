import React, { useContext, useEffect, useState } from 'react';
import { employeeContext } from '../App';

function EmployeeView() {
    const { employees, setEmployees } = useContext(employeeContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        emp_id: '',
        first_name: '',
        last_name: '',
        email: '',
        dob: '',
        salary: '',
    });

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/employees/');
                if (!response.ok) {
                    throw new Error('Failed to fetch employees');
                }
                const data = await response.json();
                setEmployees(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [setEmployees]);

    const deleteEmployee = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete employee');
            }

            const filteredEmployees = employees.filter((employee) => employee.emp_id !== id);
            setEmployees(filteredEmployees);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditClick = (employee) => {
        setEditingEmployeeId(employee.emp_id);
        setEditFormData({
            emp_id: employee.emp_id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            dob: new Date(employee.dob).toISOString().split("T")[0],
            salary: employee.salary,
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditSubmit = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editFormData)
            });

            if (!response.ok) {
                throw new Error('Failed to update employee');
            }

            const updatedEmployee = await response.json();
            setEmployees((prevEmployees) =>
                prevEmployees.map((employee) =>
                    employee.emp_id === id ? updatedEmployee : employee
                )
            );

            setEditingEmployeeId(null);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <table className='w-full'>
                <thead>
                    <tr>

                        <th className='px-4 py-2 bg-black text-white'>Employee ID</th>
                        <th className='px-4 py-2 bg-black text-white'>First Name</th>
                        <th className='px-4 py-2 bg-black text-white'>Last Name</th>
                        <th className='px-4 py-2 bg-black text-white'>Email</th>
                        <th className='px-4 py-2 bg-black text-white'>Date of Birth</th>
                        <th className='px-4 py-2 bg-black text-white'>Salary</th>
                        <th className='px-4 py-2 bg-black text-white'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((employee) => (
                            <tr key={employee.emp_id}>
                                {editingEmployeeId === employee.emp_id ? (
                                    <>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="number"
                                                name="emp_id"
                                                value={editFormData.emp_id}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={editFormData.first_name}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={editFormData.last_name}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="email"
                                                name="email"
                                                value={editFormData.email}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="date"
                                                name="dob"
                                                value={editFormData.dob}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="number"
                                                name="salary"
                                                value={editFormData.salary}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <button onClick={() => handleEditSubmit(employee.emp_id)} className='bg-green-500 text-white px-3 py-1.5 rounded-md'>Save</button>
                                            <button onClick={() => setEditingEmployeeId(null)} className='bg-gray-500 text-white px-3 py-1.5 rounded-md ml-2'>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{employee.emp_id}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{employee.first_name}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{employee.last_name}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{employee.email}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{new Date(employee.dob).toLocaleDateString()}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{employee.salary?.toFixed(2)}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <button onClick={() => handleEditClick(employee)} className='bg-blue-500 text-white px-3 py-1.5 rounded-md'>Edit</button>
                                            <button onClick={() => deleteEmployee(employee.emp_id)} className='bg-red-500 text-white px-3 py-1.5 rounded-md ml-2'>Delete</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeView;
