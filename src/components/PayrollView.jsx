import React, { useContext, useEffect, useState } from 'react';
import { payrollContext } from '../App'; // Assuming you have a context for payroll

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

      const filteredPayrolls = payrolls.filter((payroll) => payroll.payroll_id !== id);
      setPayrolls(filteredPayrolls);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClick = (payroll) => {
    setEditingPayrollId(payroll.payroll_id);
    setEditFormData({
      payroll_id: payroll.payroll_id,
      emp_id: payroll.emp_id,
      pay_period: payroll.pay_period,
      pay_date: payroll.pay_date,
      salary: payroll.salary,
      bonus: payroll.bonus,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/payrolls/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        throw new Error('Failed to update payroll');
      }

      const updatedPayroll = await response.json();
      setPayrolls((prevPayrolls) =>
        prevPayrolls.map((payroll) =>
          payroll.payroll_id === id ? updatedPayroll : payroll
        )
      );

      setEditingPayrollId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-black text-white">Payroll ID</th>
            <th className="px-4 py-2 bg-black text-white">Employee ID</th>
            <th className="px-4 py-2 bg-black text-white">Pay Period</th>
            <th className="px-4 py-2 bg-black text-white">Pay Date</th>
            <th className="px-4 py-2 bg-black text-white">Salary</th>
            <th className="px-4 py-2 bg-black text-white">Bonus</th>
            <th className="px-4 py-2 bg-black text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map((payroll) => (
            <tr key={payroll.payroll_id}>
              {editingPayrollId === payroll.payroll_id ? (
                <>
                  <td className="px-4 py-2 bg-slate-100 text-center">
                    <input
                      type="number"
                      name="payroll_id"
                      value={editFormData.payroll_id}
                      onChange={handleEditChange}
                      className="border px-2 py-1"
                      disabled
                    />
                  </td>
                  <td className="px-4 py-2 bg-slate-100 text-center">
                    <input
                      type="number"
                      name="emp_id"
                      value={editFormData.emp_id}
                      onChange={handleEditChange}
                      className="border px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-2 bg-slate-100 text-center">
                    <input
                      type="text"
                      name="pay_period"
                      value={editFormData.pay_period}
                      onChange={handleEditChange}
                      className="border px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-2 bg-slate-100 text-center">
                    <input
                      type="date"
                      name="pay_date"
                      value={editFormData.pay_date}
                      onChange={handleEditChange}
                      className="border px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-2 bg-slate-100 text-center">
                    <input
                      type="number"
                      name="salary"
                      value={editFormData.salary}
                      onChange={handleEditChange}
                      className="border px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-2 bg-slate-100 text-center">
                    <input
                      type="number"
                      name="bonus"
                      value={editFormData.bonus}
                      onChange={handleEditChange}
                      className="border px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-2 bg-slate-100 text-center">
                    <button onClick={() => handleEditSubmit(payroll.payroll_id)} className="bg-green-500 text-white px-3 py-1.5 rounded-md">Save</button>
                    <button onClick={() => setEditingPayrollId(null)} className="bg-gray-500 text-white px-3 py-1.5 rounded-md ml-2">Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-2 bg-slate-100 text-center">{payroll.payroll_id}</td>
                  <td className="px-4 py-2 bg-slate-100 text-center">{payroll.emp_id}</td>
                  <td className="px-4 py-2 bg-slate-100 text-center">{payroll.pay_period}</td>
                  <td className="px-4 py-2 bg-slate-100 text-center">{payroll.pay_date}</td>
                  <td className="px-4 py-2 bg-slate-100 text-center">{payroll.salary}</td>
                  <td className="px-4 py-2 bg-slate-100 text-center">{payroll.bonus}</td>
                  <td className="px-4 py-2 bg-slate-100 text-center">
                    <button onClick={() => handleEditClick(payroll)} className="bg-blue-500 text-white px-3 py-1.5 rounded-md">Edit</button>
                    <button onClick={() => deletePayroll(payroll.payroll_id)} className="bg-red-500 text-white px-3 py-1.5 rounded-md ml-2">Delete</button>
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
