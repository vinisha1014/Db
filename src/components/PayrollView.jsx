import React, { useContext, useEffect, useState } from 'react';
import { payrollContext } from '../App';

function PayrollView() {
    const { payrolls, setPayrolls } = useContext(payrollContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingPayrollId, setEditingPayrollId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        payroll_id: '',
        emp_id: '',
        pay_period: '',
        pay_date: '',
        salary: '',
        bonus: '',
    });

    useEffect(() => {
        const fetchPayrolls = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/payrolls');
                // console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to fetch payrolls');
                }
                const data = await response.json();
                setPayrolls(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPayrolls();
    }, [setPayrolls]);

    const deletePayroll = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/payrolls/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete payroll');
            }

            setPayrolls((prev) => prev.filter((payroll) => payroll.payroll_id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditClick = (payroll) => {
        setEditingPayrollId(payroll.payroll_id);
        setEditFormData({ ...payroll });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async (id) => {
      try {
          
          const response = await fetch(`http://localhost:5000/api/payrolls/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ...editFormData }),
          });
  
          if (!response.ok) {
              throw new Error('Failed to update payroll');
          }
  
          const updatedPayroll = await response.json();
          setPayrolls((prev) =>
              prev.map((payroll) =>
                  payroll.payroll_id === id ? updatedPayroll : payroll
              )
          );
  
          setEditingPayrollId(null);
      } catch (err) {
          setError(err.message);
      }
  };
  

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className='px-4 py-2 bg-black text-white'> Payroll ID</th>
                        <th className='px-4 py-2 bg-black text-white'> Employee ID</th>
                        <th className='px-4 py-2 bg-black text-white'> Pay Period</th>
                        <th className='px-4 py-2 bg-black text-white'> Pay Date</th>
                        <th className='px-4 py-2 bg-black text-white'> Salary</th>
                        <th className='px-4 py-2 bg-black text-white'> Bonus</th>
                        <th className='px-4 py-2 bg-black text-white'> Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payrolls.map((payroll) => (
                        <tr key={payroll.payroll_id}>
                            {editingPayrollId === payroll.payroll_id ? (
                                <>
                                    {/* Editing Row */}
                                    <td className='px-4 py-2 bg-slate-100 text-center'>
                                        <input name="payroll_id" value={editFormData.payroll_id} onChange={handleEditChange} disabled />
                                    </td>
                                    <td className='px-4 py-2 bg-slate-100 text-center'>
                                        <input name="emp_id" value={editFormData.emp_id} onChange={handleEditChange} />
                                    </td>
                                    <td className='px-4 py-2 bg-slate-100 text-center'>
                                        <input name="pay_period" value={editFormData.pay_period} onChange={handleEditChange} />
                                    </td>
                                    <td className='px-4 py-2 bg-slate-100 text-center'>
                                        <input type="date" name="pay_date" value={editFormData.pay_date} onChange={handleEditChange} />
                                    </td>
                                    <td className='px-4 py-2 bg-slate-100 text-center'>
                                        <input type="number" name="salary" value={editFormData.salary} onChange={handleEditChange} />
                                    </td>
                                    <td  className='px-4 py-2 bg-slate-100 text-center'>
                                        <input type="number" name="bonus" value={editFormData.bonus} onChange={handleEditChange} />
                                    </td>
                                    <td>
                                        <button className='bg-blue-500  px-3 py-1.5 rounded-md' onClick={() => handleEditSubmit(payroll.payroll_id)}>Save</button>
                                        <button className='bg-blue-500  px-3 py-1.5 rounded-md' onClick={() => setEditingPayrollId(null)}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    {/* Normal Row */}
                                    <td className='px-4 py-2 bg-slate-100 text-center'>{payroll.payroll_id}</td>
                                    <td className='px-4 py-2 bg-slate-100 text-center'>{payroll.emp_id}</td>
                                    <td className='px-4 py-2 bg-slate-100 text-center'>{payroll.pay_period}</td>
                                    <td className='px-4 py-2 bg-slate-100 text-center'>{payroll.pay_date}</td>
                                    <td className='px-4 py-2 bg-slate-100 text-center'>{payroll.salary}</td>
                                    <td className='px-4 py-2 bg-slate-100 text-center'>{payroll.bonus}</td>
                                    <td className='px-4 py-2 bg-slate-100 text-center'>
                                        <button className='bg-green-500  px-3 py-1.5 rounded-md' onClick={() => handleEditClick(payroll)}>Edit</button>
                                        <button className='bg-gray-500  px-3 py-1.5 rounded-md ml-2' onClick={() => deletePayroll(payroll.payroll_id)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PayrollView;
