import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { employeeContext } from '../App';

function EmployeeUpload() {
    const { employees, setEmployees } = useContext(employeeContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleCustomSubmit = async (data) => {
        try {
            // Reset form after submission
            // reset();

            // POST request to the backend API to add a new employee
            const response = await fetch('http://localhost:5000/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const newEmployee = await response.json();
                setEmployees([...employees, newEmployee]); // Update state with new employee
            } else {
                console.error('Failed to add employee');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1 className='text-2xl font-bold'>Employee Upload</h1>
            <form className='mt-6' onSubmit={handleSubmit(handleCustomSubmit)}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="emp_id">Employee ID</label>
                    <input 
                        type="number" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Employee ID' 
                        {...register("emp_id", { required: "Employee ID is required" })} 
                    />
                    <p className='text-red-500'>{errors.emp_id?.message}</p>

                    <label htmlFor="first_name">First Name</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter First Name' 
                        {...register("first_name", { required: "First Name is required" })} 
                    />
                    <p className='text-red-500'>{errors.first_name?.message}</p>

                    <label htmlFor="last_name">Last Name</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Last Name' 
                        {...register("last_name", { required: "Last Name is required" })} 
                    />
                    <p className='text-red-500'>{errors.last_name?.message}</p>

                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Email' 
                        {...register("email", { required: "Email is required" })} 
                    />
                    <p className='text-red-500'>{errors.email?.message}</p>

                    <label htmlFor="dob">Date of Birth</label>
                    <input 
                        type="date" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        {...register("dob", { required: "Date of Birth is required" })} 
                    />
                    <p className='text-red-500'>{errors.dob?.message}</p>

                    <label htmlFor="salary">Salary</label>
                    <input 
                        type="number" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Salary' 
                        {...register("salary", { required: "Salary is required" })} 
                    />
                    <p className='text-red-500'>{errors.salary?.message}</p>
                </div>

                <button type='submit' className='bg-black text-white p-2 rounded-md mt-8'>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default EmployeeUpload;
