// import React, { useEffect, useState } from "react";

// const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

// function ScheduleManager() {
//   const [employees, setEmployees] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   // Fetch employees & schedules from APIs
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [empResponse, scheduleResponse] = await Promise.all([
//           fetch("https://68ca7e64430c4476c349b244.mockapi.io/Employee_Personal_Information"),
//           fetch("https://68d939f790a75154f0d9db11.mockapi.io/schedule")
//         ]);

//         const empData = await empResponse.json();
//         const scheduleData = await scheduleResponse.json();

//         // Merge personal info and schedule by ID (assumes same IDs)
//         const merged = empData.map(emp => {
//           const schedule = scheduleData.find(s => s.id === emp.id)?.schedule || {
//             Monday: "", Tuesday: "", Wednesday: "", Thursday: "", Friday: "", Saturday: "", Sunday: ""
//           };
//           return {
//             id: emp.id,
//             name: emp.Ename,   // rename for consistency
//             role: emp.Roll,
//             schedule
//           };
//         });

//         setEmployees(merged);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Update schedule locally & API
//   const updateSchedule = async (empId, day, value) => {
//     const empToUpdate = employees.find(emp => emp.id === empId);
//     if (!empToUpdate) return;

//     const updatedEmployee = {
//       ...empToUpdate,
//       schedule: { ...empToUpdate.schedule, [day]: value }
//     };

//     // Update locally
//     setEmployees(employees.map(emp => emp.id === empId ? updatedEmployee : emp));

//     // Update schedule API
//     try {
//       await fetch(`https://68d939f790a75154f0d9db11.mockapi.io/schedule/${empId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ schedule: updatedEmployee.schedule })
//       });
//     } catch (error) {
//       console.error("Error updating schedule:", error);
//     }
//   };

//   // Filter employees
//   const filtered = employees.filter(emp =>
//     emp.name?.toLowerCase().includes(search.toLowerCase()) ||
//     emp.role?.toLowerCase().includes(search.toLowerCase())
//   );

//   if (loading) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold text-center mb-6">Employee Schedule Management</h1>

//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search by name or role..."
//         className="w-full mb-6 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* Schedule Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
//           <thead>
//             <tr className="bg-blue-600 text-white">
//               <th className="p-3 text-left">Employee</th>
//               <th className="p-3 text-left">Role</th>
//               {days.map(day => (
//                 <th key={day} className="p-3 text-center">{day}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map(emp => (
//               <tr key={emp.id} className="border-b hover:bg-gray-50">
//                 <td className="p-3 font-semibold">{emp.name}</td>
//                 <td className="p-3">{emp.role}</td>
//                 {days.map(day => (
//                   <td key={day} className="p-2 text-center">
//                     <input
//                       type="text"
//                       value={emp.schedule[day]}
//                       onChange={(e) => updateSchedule(emp.id, day, e.target.value)}
//                       className="w-full p-1 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ScheduleManager;


import React, { useEffect, useState } from "react";

const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

function ScheduleManager() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch employees & schedules from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empResponse, scheduleResponse] = await Promise.all([
          fetch("https://68ca7e64430c4476c349b244.mockapi.io/Employee_Personal_Information"),
          fetch("https://68d939f790a75154f0d9db11.mockapi.io/schedule")
        ]);

        const empData = await empResponse.json();
        const scheduleData = await scheduleResponse.json();

        // Merge personal info and schedule by ID
        const merged = empData.map(emp => {
          const schedule = scheduleData.find(s => s.id === emp.id)?.schedule || {
            Monday: "", Tuesday: "", Wednesday: "", Thursday: "", Friday: "", Saturday: "", Sunday: ""
          };
          return {
            id: emp.id,
            name: emp.Ename,
            role: emp.Roll,
            schedule
          };
        });

        setEmployees(merged);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update schedule locally & send to API
  const updateSchedule = async (empId, day, value) => {
    // Update locally
    const updatedEmployees = employees.map(emp => {
      if (emp.id === empId) {
        return { ...emp, schedule: { ...emp.schedule, [day]: value } };
      }
      return emp;
    });

    setEmployees(updatedEmployees);

    // Send updated schedule to API
    try {
      const empToUpdate = updatedEmployees.find(emp => emp.id === empId);
      await fetch(`https://68d939f790a75154f0d9db11.mockapi.io/schedule/${empId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schedule: empToUpdate.schedule })
      });
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  // Filter employees
  const filtered = employees.filter(emp =>
    emp.name?.toLowerCase().includes(search.toLowerCase()) ||
    emp.role?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Employee Schedule Management</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or role..."
        className="w-full mb-6 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Schedule Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">Employee</th>
              <th className="p-3 text-left">Role</th>
              {days.map(day => (
                <th key={day} className="p-3 text-center">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(emp => (
              <tr key={emp.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">{emp.name}</td>
                <td className="p-3">{emp.role}</td>
                {days.map(day => (
                  <td key={day} className="p-2 text-center">
                    <input
                      type="text"
                      value={emp.schedule[day]}
                      onChange={(e) => updateSchedule(emp.id, day, e.target.value)}
                      className="w-full p-1 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScheduleManager;
