import React, { useContext, useEffect, useState } from 'react';
import { departmentContext } from '../App'; // Assuming you have a context for departments

function DepartmentView() {
    const { departments, setDepartments } = useContext(departmentContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingDepartmentId, setEditingDepartmentId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        dep_id: '',
        dep_name: '',
        dep_email: '',
        emp_id: '',
    });

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/departments/');
                if (!response.ok) {
                    throw new Error('Failed to fetch departments');
                }
                const data = await response.json();
                setDepartments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, [setDepartments]);

    const deleteDepartment = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/departments/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete department');
            }

            const filteredDepartments = departments.filter((department) => department.dep_id !== id);
            setDepartments(filteredDepartments);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditClick = (department) => {
        setEditingDepartmentId(department.dep_id);
        setEditFormData({
            dep_id: department.dep_id,
            dep_name: department.dep_name,
            dep_email: department.dep_email,
            emp_id: department.emp_id,
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
            const response = await fetch(`http://localhost:5000/api/departments/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editFormData)
            });

            if (!response.ok) {
                throw new Error('Failed to update department');
            }

            const updatedDepartment = await response.json();
            setDepartments((prevDepartments) =>
                prevDepartments.map((department) =>
                    department.dep_id === id ? updatedDepartment : department
                )
            );

            setEditingDepartmentId(null);
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
                        <th className='px-4 py-2 bg-black text-white'>Department ID</th>
                        <th className='px-4 py-2 bg-black text-white'>Department Name</th>
                        <th className='px-4 py-2 bg-black text-white'>Department Email</th>
                        <th className='px-4 py-2 bg-black text-white'>Employee ID</th>
                        <th className='px-4 py-2 bg-black text-white'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departments.map((department) => (
                            <tr key={department.dep_id}>
                                {editingDepartmentId === department.dep_id ? (
                                    <>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="number"
                                                name="dep_id"
                                                value={editFormData.dep_id}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                                disabled
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="text"
                                                name="dep_name"
                                                value={editFormData.dep_name}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="email"
                                                name="dep_email"
                                                value={editFormData.dep_email}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
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
                                            <button onClick={() => handleEditSubmit(department.dep_id)} className='bg-green-500 text-white px-3 py-1.5 rounded-md'>Save</button>
                                            <button onClick={() => setEditingDepartmentId(null)} className='bg-gray-500 text-white px-3 py-1.5 rounded-md ml-2'>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{department.dep_id}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{department.dep_name}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{department.dep_email}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{department.emp_id}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <button onClick={() => handleEditClick(department)} className='bg-blue-500 text-white px-3 py-1.5 rounded-md'>Edit</button>
                                            <button onClick={() => deleteDepartment(department.dep_id)} className='bg-red-500 text-white px-3 py-1.5 rounded-md ml-2'>Delete</button>
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

export default DepartmentView;
