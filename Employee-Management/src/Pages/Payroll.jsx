import React, { useEffect, useState } from "react";

function Payroll() {
  const [employees, setEmployees] = useState([]);
  const [payments, setPayments] = useState([]);
  const salaryPerDay = 450;

  // Fetch employee personal info
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(
        "https://68ca7e64430c4476c349b244.mockapi.io/Employee_Personal_Information"
      );
      const data = await response.json();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  // Fetch attendance/payment info
  useEffect(() => {
    const fetchPayments = async () => {
      const res = await fetch(
        "https://68d939f790a75154f0d9db11.mockapi.io/attendance"
      );
      const paymentData = await res.json();
      setPayments(paymentData);
    };
    fetchPayments();
  }, []);

  // Merge employee + attendance
  const mergedData = employees.map((emp) => {
    const pay = payments.find((p) => p.Roll === emp.Roll) || {};
    const present = Number(pay.present) || 0;
    const absent = Number(pay.absent) || 0;
    const overtime = Number(pay.overtime) || 0;
    const netSalary = present * salaryPerDay + overtime * 50 - absent * salaryPerDay;

    return {
      ...emp,
      present,
      absent,
      overtime,
      netSalary,
    };
  });

  return (
    <div>
      <nav>
        <div className="header relative">
          <h1 className="bg-blue-500 text-center text-white p-5 text-xl font-bold w-full">
            Employee Attendance
          </h1>
        </div>
      </nav>

      <div className="attendance">
        <div className="p-5 overflow-x-auto">
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Salary / Day</th>
                <th className="border p-2">Present (Days)</th>
                <th className="border p-2">Absent (Days)</th>
                <th className="border p-2">Overtime (OT) hours</th>
                <th className="border p-2">Net Salary</th>
                <th className="border p-2">Payment Process</th>
              </tr>
            </thead>
            <tbody>
              {mergedData.map((d) => (
                <tr key={d.id}>
                  <td className="border text-center font-bold p-2">{d.Roll}</td>
                  <td className="border p-2 font-bold">{d.Ename}</td>
                  <td className="border p-2 font-bold text-center">₹{salaryPerDay}</td>
                  <td className="border p-2 font-bold text-center">{d.present}</td>
                  <td className="border p-2 font-bold text-center">{d.absent}</td>
                  <td className="border p-2 font-bold text-center">{d.overtime}</td>
                  <td className="border p-2 font-bold text-center">₹{d.netSalary}</td>
                  <td className="border p-2 font-bold text-center">
                    <a
                      href="/payment"
                      className="bg-green-500 p-2 text-white flex justify-center"
                    >
                      Pay Now
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Payroll;
