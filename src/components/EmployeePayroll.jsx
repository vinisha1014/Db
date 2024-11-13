import React, { useEffect, useState } from 'react';

const EmployeePayrollView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeePayroll = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/payrollviews/employee-payroll');
        if (!response.ok) {
          throw new Error('Failed to fetch employee payroll data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeePayroll();
  }, []);

  if (loading) {
    return <div className="text-center py-4 text-blue-600">Loading payroll details...</div>;
  }
  if (error) {
    return <div className="text-center py-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div id="tabContainer" className="w-full p-4 flex flex-col items-center gap-4">
      <h2 className="text-center text-2xl font-bold mb-4 text-gray-700">Employee Payroll Details</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-black text-white">Employee ID</th>
            <th className="px-4 py-2 bg-black text-white">Employee Name</th>
            <th className="px-4 py-2 bg-black text-white">Payroll ID</th>
            <th className="px-4 py-2 bg-black text-white">Pay Period</th>
            <th className="px-4 py-2 bg-black text-white">Salary</th>
            <th className="px-4 py-2 bg-black text-white">Bonus</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.payroll_id} className="odd:bg-gray-100 even:bg-white">
              <td className="px-4 py-2 text-center border">{item.emp_id}</td>
              <td className="px-4 py-2 text-center border">{item.full_name}</td>
              <td className="px-4 py-2 text-center border">{item.payroll_id}</td>
              <td className="px-4 py-2 text-center border">{item.pay_period}</td>
              <td className="px-4 py-2 text-center border">{item.salary}</td>
              <td className="px-4 py-2 text-center border">{item.bonus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeePayrollView;
