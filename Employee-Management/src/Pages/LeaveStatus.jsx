import React, { useEffect, useState } from "react";

function LeaveStatus() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [Leaves, setLeaves]=useState([])

  
  useEffect(() => {
    const fetchData = async () => {
     
        const res = await fetch("https://68ca7e64430c4476c349b244.mockapi.io/Employee_Leave_Form");
        const data = await res.json();
        setApplications(data);
      
    };

    fetchData();
  }, []);

  const Delete=async(id)=>{
     if (!window.confirm("Are you sure you want to delete this leave?")) return;
    await fetch(`https://68ca7e64430c4476c349b244.mockapi.io/Employee_Leave_Form/${id}`,{
      method:"DELETE"
    })
    setLeaves((prev) => prev.filter((app) => app.id !== id));
  }
 

  

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">Leave Status</h1>
    <div className="flex justify-center">
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl p-6 w-150">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Employee Name</th>
              <th className="p-3">Leave Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{app.Roll}</td>
                <td className="p-3">{app.Ename}</td>
                <td className="p-3">{app.leaveType}</td>
                <td className={`p-3 font-semibold ${app.status === "Accepted"? "text-green-600" : app.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>
                  {app.status || "Pending"}
                </td>
                <div className="flex justify-center items-center h-13">
                <button onClick={()=>Delete(app.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Cancel
                </button>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}



export default LeaveStatus
