import React, { useState } from "react";

const NetSalaryCalculator = () => {
  const [salary, setSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [providentFund, setProvidentFund] = useState("");
  const [netSalary, setNetSalary] = useState(null);

  const calculateNetSalary = () => {
    const salaryNum = parseFloat(salary) || 0;
    const bonusNum = parseFloat(bonus) || 0;
    const tax = (parseFloat(taxRate) || 0) / 100;
    const providentFundNum = parseFloat(providentFund) || 0;

    const grossSalary = salaryNum + bonusNum;
    const deductions = grossSalary * tax + providentFundNum;
    setNetSalary(grossSalary - deductions);
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Net Salary Calculator</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Salary (₹):</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bonus (₹):</label>
          <input
            type="number"
            value={bonus}
            onChange={(e) => setBonus(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tax Rate (%):</label>
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Provident Fund (₹):</label>
          <input
            type="number"
            value={providentFund}
            onChange={(e) => setProvidentFund(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          onClick={calculateNetSalary}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Calculate Net Salary
        </button>
        {netSalary !== null && (
          <div className="mt-4 text-green-600 text-lg">
            Net Salary: ₹{netSalary.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default NetSalaryCalculator;
