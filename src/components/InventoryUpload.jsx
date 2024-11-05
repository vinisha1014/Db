import React from 'react';
import { useForm } from 'react-hook-form';

const InventoryUpload = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleCustomSubmit = async (data) => {
        const inventoryData = {
            stock_name: data.stock_name,
            stock_quantity: data.stock_quantity,
        };

        try {
            const response = await fetch('http://localhost:5000/api/inventory/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inventoryData),
            });

            if (!response.ok) {
                throw new Error('Failed to upload inventory');
            }

            const result = await response.json();
            console.log('Inventory uploaded successfully:', result);
            // Optionally, reset the form or show a success message
        } catch (error) {
            console.error(error);
            // Optionally, handle errors
        }
    };

    return (
        <div>
            <h1 className='text-2xl font-bold'>Inventory Upload</h1>
            <form className='mt-6' onSubmit={handleSubmit(handleCustomSubmit)}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="stock_name">Stock Name</label>
                    <input
                        type="text"
                        className='border-2 border-gray-600 rounded-md p-2'
                        placeholder='Enter Stock Name'
                        {...register("stock_name", { required: "Stock Name is required" })}
                    />
                    <p className='text-red-500'>{errors.stock_name?.message}</p>

                    <label htmlFor="stock_quantity">Stock Quantity</label>
                    <input
                        type="number"
                        className='border-2 border-gray-600 rounded-md p-2'
                        placeholder='Enter Stock Quantity'
                        {...register("stock_quantity", { required: "Stock Quantity is required" })}
                    />
                    <p className='text-red-500'>{errors.stock_quantity?.message}</p>
                </div>

                <button type='submit' className='bg-black text-white p-2 rounded-md mt-8'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default InventoryUpload;
