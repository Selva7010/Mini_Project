


import React, { useEffect, useState } from "react";

function HRLeaveApproval() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchData = async () => {
     
        const res = await fetch(
          "https://68ca7e64430c4476c349b244.mockapi.io/Employee_Leave_Form"
        );
        if (!res.ok) throw new Error("Failed to fetch leave applications");
        const data = await res.json();
        setApplications(data);
      
    };

    fetchData();
  }, []);

  
  const handleStatusChange = async (id, newStatus) => {
   
      const res = await fetch(
        `https://68ca7e64430c4476c349b244.mockapi.io/Employee_Leave_Form/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app
        )
      );
    
  };

  

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
      Leave Requests
      </h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Employee Name</th>
              <th className="p-3">Leave Type</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{app.Roll}</td>
                <td className="p-3">{app.Ename}</td>
                <td className="p-3">{app.leaveType}</td>
                <td className="p-3">{app.fromDate}</td>
                <td className="p-3">{app.toDate}</td>
                <td className="p-3">{app.reason}</td>
                <td
                  className={`p-3 font-semibold ${
                    app.status === "Accepted" ? "text-green-600" : app.status === "Rejected" ? "text-red-600" : "text-yellow-600"
                  }`}
                >
                  {app.status || "Pending"}
                </td>
                <td className="p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => handleStatusChange(app.id, "Accepted")}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(app.id, "Rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleStatusChange(app.id, "Pending")} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Pending
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HRLeaveApproval