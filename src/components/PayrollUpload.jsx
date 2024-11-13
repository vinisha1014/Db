import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { payrollContext } from '../App';

function PayrollUpload() {
    const { payrolls, setPayrolls } = useContext(payrollContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleCustomSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/payrolls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to add payroll entry');
            }

            const newPayroll = await response.json();
            setPayrolls((prevPayrolls) => [...prevPayrolls, newPayroll]);
            reset();
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div>
            <h1 className='text-2xl font-bold'>Payroll Upload</h1>
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

                    <label htmlFor="pay_period">Pay Period</label>
                    <input
                        type="text"
                        className='border-2 border-gray-600 rounded-md p-2'
                        placeholder='Enter Pay Period (e.g., 2024-01)'
                        {...register("pay_period", { required: "Pay period is required" })}
                    />
                    <p className='text-red-500'>{errors.pay_period?.message}</p>

                    <label htmlFor="pay_date">Pay Date</label>
                    <input
                        type="date"
                        className='border-2 border-gray-600 rounded-md p-2'
                        {...register("pay_date", { required: "Pay date is required" })}
                    />
                    <p className='text-red-500'>{errors.pay_date?.message}</p>

                    <label htmlFor="salary">Salary</label>
                    <input
                        type="number"
                        step="0.01"
                        className='border-2 border-gray-600 rounded-md p-2'
                        placeholder='Enter Salary'
                        {...register("salary", { required: "Salary is required" })}
                    />
                    <p className='text-red-500'>{errors.salary?.message}</p>

                    <label htmlFor="bonus">Bonus</label>
                    <input
                        type="number"
                        step="0.01"
                        className='border-2 border-gray-600 rounded-md p-2'
                        placeholder='Enter Bonus (optional)'
                        {...register("bonus")}
                    />
                </div>

                <button type='submit' className='bg-black text-white p-2 rounded-md mt-8'>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default PayrollUpload;
