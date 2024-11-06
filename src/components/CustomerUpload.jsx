import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { customerContext } from '../App';

function CustomerUpload() {
    const { customers, setCustomers } = useContext(customerContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleCustomSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to add customer');
            }

            const newCustomer = await response.json();
            setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
            reset();
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div>
            <h1 className='text-2xl font-bold'>Customer Upload</h1>
            <form className='mt-6' onSubmit={handleSubmit(handleCustomSubmit)}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="customer_name">Customer Name</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Customer Name' 
                        {...register("customer_name", { 
                            required: { value: true, message: "Customer name is required" } 
                        })} 
                    />
                    <p className='text-red-500'>{errors.customer_name?.message}</p>

                    <label htmlFor="address">Address</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Address' 
                        {...register("address", { 
                            required: { value: true, message: "Address is required" } 
                        })} 
                    />
                    <p className='text-red-500'>{errors.address?.message}</p>

                    <label htmlFor="phone">Phone</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Phone Number' 
                        {...register("phone", { 
                            required: { value: true, message: "Phone number is required" } 
                        })} 
                    />
                    <p className='text-red-500'>{errors.phone?.message}</p>

                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Email' 
                        {...register("email", { 
                            required: { value: true, message: "Email is required" } 
                        })} 
                    />
                    <p className='text-red-500'>{errors.email?.message}</p>
                </div>

                <button type='submit' className='bg-black text-white p-2 rounded-md mt-8'>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CustomerUpload;
