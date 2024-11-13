import React from 'react';
import { useForm } from 'react-hook-form';

function SupplierUpload() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleCustomSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/suppliers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to create supplier');
            }

            window.location.href = '/supplier/view'; // Redirect to the suppliers page
            // onCreate(newSupplier); // Update the supplier list in parent component if needed
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1 className='text-2xl font-bold'>Supplier Upload</h1>
            <form className='mt-6' onSubmit={handleSubmit(handleCustomSubmit)}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="supplier_name">Supplier Name</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Supplier Name' 
                        {...register("supplier_name", { required: "Supplier Name is required" })} 
                    />
                    <p className='text-red-500'>{errors.supplier_name?.message}</p>

                    <label htmlFor="contact_person">Contact Person</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Contact Person' 
                        {...register("contact_person")} 
                    />

                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Email' 
                        {...register("email", { required: "Email is required" })} 
                    />
                    <p className='text-red-500'>{errors.email?.message}</p>

                    <label htmlFor="phone_number">Phone Number</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Phone Number' 
                        {...register("phone_number")} 
                    />

                    <label htmlFor="address">Address</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Address' 
                        {...register("address")} 
                    />

                    <label htmlFor="city">City</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter City' 
                        {...register("city")} 
                    />

                    <label htmlFor="state">State</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter State' 
                        {...register("state")} 
                    />

                    <label htmlFor="postal_code">Postal Code</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Postal Code' 
                        {...register("postal_code")} 
                    />

                    <label htmlFor="country">Country</label>
                    <input 
                        type="text" 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Country' 
                        {...register("country")} 
                    />

                    <label htmlFor="items_supplied">Items Supplied</label>
                    <textarea 
                        className='border-2 border-gray-600 rounded-md p-2' 
                        placeholder='Enter Items Supplied' 
                        {...register("items_supplied")} 
                    ></textarea>

                </div>

                <button type='submit' className='bg-black text-white p-2 rounded-md mt-8'>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default SupplierUpload;
