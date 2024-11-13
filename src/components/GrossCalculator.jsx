import React, { useState } from "react";

const GrossSalaryCalculator = () => {
  const [salary, setSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [grossSalary, setGrossSalary] = useState(null);

  const calculateGrossSalary = () => {
    const salaryNum = parseFloat(salary) || 0;
    const bonusNum = parseFloat(bonus) || 0;
    setGrossSalary(salaryNum + bonusNum);
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Gross Salary Calculator</h2>
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
        <button
          onClick={calculateGrossSalary}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Calculate Gross Salary
        </button>
        {grossSalary !== null && (
          <div className="mt-4 text-green-600 text-lg">
            Gross Salary: ₹{grossSalary.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default GrossSalaryCalculator;
