import React from "react";
import GrossSalaryCalculator from "./GrossCalculator";
import NetSalaryCalculator from "./NetCalculator";

const PayrollCalculators = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Payroll Calculators</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GrossSalaryCalculator />
        <NetSalaryCalculator />
      </div>
    </div>
  );
};

export default PayrollCalculators;
