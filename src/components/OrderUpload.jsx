import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { orderContext } from '../App'; // Assuming you have an order context set up

function OrderUpload() {
    const { orders, setOrders } = useContext(orderContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleCustomSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to add order');
            }

            const newOrder = await response.json();
            setOrders((prevOrders) => [...prevOrders, newOrder]);
            reset();
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div>
            <h1 className='text-2xl font-bold'>Order Upload</h1>
            <form className='mt-6' onSubmit={handleSubmit(handleCustomSubmit)}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="order_no">Order Number</label>
                    <input 
                        type="number" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Order Number' 
                        {...register("order_no", { 
                            required: { value: true, message: "Order number is required" } 
                        })} 
                    />
                    <p className='text-red-500'>{errors.order_no?.message}</p>

                    <label htmlFor="order_date">Order Date</label>
                    <input 
                        type="date" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        {...register("order_date", { 
                            required: { value: true, message: "Order date is required" } 
                        })} 
                    />
                    <p className='text-red-500'>{errors.order_date?.message}</p>

                    <label htmlFor="customer_id">Customer ID</label>
                    <input 
                        type="number" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Customer ID' 
                        {...register("customer_id", { 
                            required: { value: true, message: "Customer ID is required" } 
                        })} 
                    />
                    <p className='text-red-500'>{errors.customer_id?.message}</p>

                    <label htmlFor="total_amount">Total Amount</label>
                    <input 
                        type="number" 
                        step="0.01" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Total Amount' 
                        {...register("total_amount", { 
                            required: { value: true, message: "Total amount is required" } 
                        })} 
                    />
                    <p className='text-red-500'>{errors.total_amount?.message}</p>

                    <label htmlFor="status">Status</label>
                    <select 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        {...register("status", { 
                            required: { value: true, message: "Status is required" } 
                        })}
                    >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <p className='text-red-500'>{errors.status?.message}</p>
                </div>

                <button type='submit' className='bg-black text-white p-2 rounded-md mt-8'>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default OrderUpload;
