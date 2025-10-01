import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Employeemainpage() {
  const location = useLocation();
  const { employee } = location.state || {};


  const [leaveStatus, setleaveStatus] = useState("")
  const [formData, setFormData] = useState({
    Roll: "",
    Ename: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    if (employee?.Roll) {
      setFormData((prev) => ({ ...prev, Roll: employee.Roll }))
    }
    if (employee?.Ename) {
      setFormData((prev) => ({ ...prev, Ename: employee.Ename }))
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    setSuccess("");
    setError("");


    const response = await fetch(
      "https://68ca7e64430c4476c349b244.mockapi.io/Employee_Leave_Form",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, status: "Pending" }),
      }
    );

    if (!response.ok) throw new Error("Failed to submit leave application");

    setSuccess("Leave application submitted ✅");
    setFormData({
      Roll: employee.Roll || "",
      Ename: "",
      leaveType: "",
      fromDate: "",
      toDate: "",
      reason: "",
    });


  };



  (async () => {
    const response = await fetch("https://68ca7e64430c4476c349b244.mockapi.io/Employee_Leave_Form")
    const data = await response.json()
    const status = data.map((sts) => {
      setleaveStatus(sts.status)
    })

  })


  return (
    <div>
      <div className="header bg-blue-600 p-5 flex items bg-center justify-between">
        <h1 className="text-white text-4xl font-bold"></h1>
        <div className="flex items-center">
          <a href="/LeaveStatus"><h1 className="text-xl font-bold ml-230 bg-white text-blue-500 p-2">Leave Status</h1></a>
          <h1 className="text-white text-xl font-bold ml-20">Hi, {employee.Ename}</h1>
        </div>
        <div className="flex">
          <a href="/Home" className="text-white text-xl font-bold bg-red-500 p-2 rounded">Logout</a>
        </div>
      </div>


      <div className="personaldata p-10 flex justify-evenly ">
        <div className="data bg-white border border-gray-200 rounded-2xl w-150 h-150 p-5">
          <h2 className="text-xl font-bold mb-4 text-blue-600 text-center">Personal Details</h2>
          <div className="name bg-blue-500 p-3 rounded-2xl w-full mt-2">
            <h1 className="text-2xl font-semibold text-white "><span className="text-blue-950">Name : </span>{employee.Ename}</h1>
          </div>
          <div className="name bg-blue-500 p-3 rounded-2xl w-full mt-2">
            <h1 className="text-2xl font-semibold text-white "><span className="text-blue-950">Age : </span>{employee.age}</h1>
          </div>
          <div className="name bg-blue-500 p-3 rounded-2xl w-full mt-2">
            <h1 className="text-2xl font-semibold text-white "><span className="text-blue-950">DOB : </span>{employee.DOB}</h1>
          </div>
          <div className="name bg-blue-500 p-3 rounded-2xl w-full mt-2">
            <h1 className="text-2xl font-semibold text-white "><span className="text-blue-950">DOJ : </span>{employee.DOJ}</h1>
          </div>
          <div className="name bg-blue-500 p-3 rounded-2xl w-full mt-2">
            <h1 className="text-2xl font-semibold text-white "><span className="text-blue-950">Phone : </span>{employee.phone}</h1>
          </div>
          <div className="name bg-blue-500 p-3 rounded-2xl w-full mt-2">
            <h1 className="text-2xl font-semibold text-white "><span className="text-blue-950">City : </span>{employee.city}</h1>
          </div>
          <div className="name bg-blue-500 p-3 rounded-2xl w-full mt-2">
            <h1 className="text-2xl font-semibold text-white "><span className="text-blue-950">Aadhar Number : </span>{employee.aadharnumber}</h1>
          </div>
          <div className="name bg-blue-500 p-3 rounded-2xl mt-2">
            <h1 className="text-2xl font-semibold text-white "><span className="text-blue-950">Address : </span>{employee.address}</h1>
          </div>
        </div>

        <div>
          <div className="text-center ">
            <div className="flex justify-center">
              <div className="bg-white shadow-md rounded-2xl p-6 mb-6 w-100">
                <h2 className="text-xl font-bold mb-4 text-blue-600">
                  Apply for Leave
                </h2>

                {success && <p className="text-green-600 mb-2">{success}</p>}
                {error && <p className="text-red-600 mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-2">

                  <h1 className="text-xl font-semibold " >Your ID : <span className="text-green-800">{employee.Roll}</span></h1>
                  <label htmlFor="" className="flex text-xl" >Name:</label>
                  <input type="text" value={employee.Ename} placeholder="Employee Name" required className="w-full border p-2 text-xl rounded-lg" />
                  <label htmlFor="" className="flex text-xl" >Leave Type:</label>
                  <select name="leaveType" value={formData.leaveType} onChange={handleChange} required className="w-full border p-2 rounded-lg">
                    <option value="">Select Leave Type</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Maternity Leave">Maternity Leave</option>
                  </select>
                  <div className="flex justify-between">
                    <label htmlFor="" className="text-xl" >From date:</label>
                    <label htmlFor="" className="text-xl mr-25" >To date:</label>
                  </div>
                  <div className="flex gap-4">
                    <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required className="w-1/2 border p-2 rounded-lg" />

                    <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required className="w-1/2 border p-2 rounded-lg" />
                  </div>
                  <label htmlFor="" className="flex text-xl" >Reason:</label>
                  <textarea name="reason" value={formData.reason} onChange={handleChange} required className="w-full border p-2 rounded-lg" rows="3" placeholder="Reason for leave"></textarea>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>




          <div className="salary flex justify-center">
            <a href="/salary" className="name bg-blue-500 p-3 rounded-2xl w-50 mt-10"> 
              <h1 className="text-2xl font-semibold text-Green-950 text-center">View Salary</h1>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employeemainpage;