import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { employeeContext } from '../App';

function EmployeeUpload() {
    const { employees, setEmployees } = useContext(employeeContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleCustomSubmit = (data) => {
        reset();
        const currentEmployeeId = employees.length > 0
            ? Math.max(...employees.map(emp => emp.id)) + 1
            : 1;

        const newEmployee = {
            id: currentEmployeeId,
            name: data.name,
            address:data.address,
            age:data.age
        };

        setEmployees([...employees, newEmployee]);
    };

    return (
        <div>
            <h1 className='text-2xl font-bold'>Employee Upload</h1>
            <form className='mt-6' onSubmit={handleSubmit(handleCustomSubmit)}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Employee Name' 
                        {...register("name", { 
                            required: { value: true, message: "Name is required" } 
                        })} 
                    />
                           <p className='text-red-500'>{errors.name?.message}</p>
                     <label htmlFor="Address">Address</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Employee Address' 
                        {...register("address", { 
                            required: { value: true, message: "Address is required" } 
                        })} 
                    />
                           <p className='text-red-500'>{errors.address?.message}</p>
                     <label htmlFor="Age">Age</label>
                    <input 
                        type="number" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Employee Age' 
                        {...register("age", { 
                            required: { value: true, message: "Age is required" } 
                        })} 
                    />
                           <p className='text-red-500'>{errors.age?.message}</p>
             
                </div>

                <button type='submit' className='bg-black text-white p-2 rounded-md mt-8'>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default EmployeeUpload;
