import {useEffect, useState } from "react";

function Payment() {
  const [EmployeeData, setEmployeeData]=useState([])
  const [Edata, setEdata]=useState([])
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    Roll: "",
    name: "",
    present: "",
    absent: "",
    overtime: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   useEffect(() => {
      const fetchEmployees = async () => {
        const response = await fetch(
          "https://68ca7e64430c4476c349b244.mockapi.io/Employee_Personal_Information"
        );
        const data = await response.json();
        setEmployeeData(data);
      };
      fetchEmployees();
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const netsalary = Number(form.present) * 450 + Number(form.overtime) * 50 - Number(form.absent) * 450;

    const newEmployee = { ...form, netsalary };
    setEmployees([...employees, newEmployee]);

    await fetch("https://68d939f790a75154f0d9db11.mockapi.io/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    });

    // reset form
    setForm({ Roll: "", name: "", present: "", absent: "", overtime: "" });
  };

  const handlePayment = async (id, netsalary) => {
    await fetch(
      `https://68d939f790a75154f0d9db11.mockapi.io/attendance/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ netsalary }),
      }
    );

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, netsalary } : emp
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav>
        <div className="header relative">
          <h1 className="bg-blue-500 text-center text-white p-5 text-xl font-bold w-full">
            Salary Checkout
          </h1>
        </div>
      </nav>

      {/* Employee Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 max-w-md mx-auto">
        
       
            <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="Roll"
            value={form.Roll}
            onChange={handleChange}
            placeholder="Employee ID"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="name"
            value={form.Ename}
            onChange={handleChange}
            placeholder="Employee Name"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            name="present"
            value={form.present}
            onChange={handleChange}
            placeholder="Present days"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            name="absent"
            value={form.absent}
            onChange={handleChange}
            placeholder="Absent days"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            name="overtime"
            value={form.overtime}
            onChange={handleChange}
            placeholder="Overtime (OT)"
            className="w-full mb-2 p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Pay Now</button>
        </form>
    
        
      </div>


      <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Your Salary</h2>
        {employees.map((emp, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <p>
                <strong>{emp.name}</strong> (ID: {emp.Roll})
              </p>
              <p>Net Salary: ₹ {emp.netsalary}</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Payment;
