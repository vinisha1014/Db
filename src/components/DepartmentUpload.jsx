import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { departmentContext } from '../App';

function DepartmentUpload() {
    const { departments, setDepartments } = useContext(departmentContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleCustomSubmit = (data) => {
        reset();
        const currentDepId = departments.length > 0
            ? Math.max(...departments.map(dep => dep.id)) + 1
            : 1;


        const newDep = {
            id: currentDepId,
            name: data.name,
            address: data.address,
            age: data.age
        };

        setDepartments([...departments, newDep]);
        console.log(data);
    };

    return (
        <div>
            <h1 className='text-2xl font-bold'>Department Upload</h1>
            <form className='mt-6' onSubmit={handleSubmit(handleCustomSubmit)}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Department Name' 
                        {...register("name", { 
                            required: { value: true, message: "Name is required" } 
                        })} 
                    />
                    <p className='text-red-500'>{errors.name?.message}</p>

                    <label htmlFor="address">Address</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Department Address' 
                        {...register("address", { 
                            required: { value: true, message: "Address is required" } 
                        })} 
                    />
                    <p className='text-red-500'>{errors.address?.message}</p>

                    <label htmlFor="age">Age</label>
                    <input 
                        type="number" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Department Age' 
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

export default DepartmentUpload;
