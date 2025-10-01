import React, { useEffect, useState } from "react";

export default function EmployeeTracker() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  // Update Performance
  const updatePerformance = (id, change) => {
    setEmployees(employees.map(emp =>
      emp.id === id
        ? { ...emp, performance: Math.min(10, Math.max(0, (emp.performance || 0) + change)) }
        : emp
    ));
  };

  // Update Schedule
  const updateSchedule = (id, newSchedule) => {
    setEmployees(employees.map(emp =>
      emp.id === id ? { ...emp, schedule: newSchedule } : emp
    ));
  };

  // Fetch Employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("https://68ca7e64430c4476c349b244.mockapi.io/Employee_Personal_Information");
        const data = await response.json();
        const enrichedData = data.map(emp => ({
          ...emp,
          performance: emp.performance ?? 5,
          schedule: emp.schedule ?? "Not Assigned"
        }));

        setEmployees(enrichedData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Filtering employees
  const filtered = employees.filter(emp =>
    emp.Ename.toLowerCase().includes(search.toLowerCase()) ||
    emp.Roll.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Employee Performance</h1>
      {/* <a href="/schedule">Schedule</a> */}

      {/* Search */}
      <input
        type="text"
        placeholder="Search employees..."
        className="w-full p-2 mb-6 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Employee List */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((emp) => (
          <div key={emp.id} className="bg-white shadow-md rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold">{emp.Ename}</h2>
              <p className="text-gray-600">{emp.Roll}</p>
              <p className="mt-2">
                Performance: <span className="font-bold">{emp.performance}/10</span>
              </p>
            </div>

            {/* Controls */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => updatePerformance(emp.id, 1)}
                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                +1
              </button>
              <button
                onClick={() => updatePerformance(emp.id, -1)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                -1
              </button>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
}
