import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { departmentContext } from '../App';

function DepartmentUpload() {
    const { departments, setDepartments } = useContext(departmentContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleCustomSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/departments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to add department');
            }

            const newDepartment = await response.json();
            setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);
            reset();
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div>
            <h1 className='text-2xl font-bold'>Department Upload</h1>
            <form className='mt-6' onSubmit={handleSubmit(handleCustomSubmit)}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="dep_name">Department Name</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Department Name' 
                        {...register("dep_name", { 
                            required: { value: true, message: "Department name is required" } 
                        })} 
                    />
                    <p className='text-red-500'>{errors.dep_name?.message}</p>

                    <label htmlFor="dep_email">Department Email</label>
                    <input 
                        type="email" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Department Email' 
                        {...register("dep_email", { 
                            required: { value: true, message: "Email is required" } 
                        })} 
                    />
                    <p className='text-red-500'>{errors.dep_email?.message}</p>

                    <label htmlFor="emp_id">Employee ID</label>
                    <input 
                        type="number" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Employee ID (optional)' 
                        {...register("emp_id")} 
                    />
                </div>

                <button type='submit' className='bg-black text-white p-2 rounded-md mt-8'>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default DepartmentUpload;
