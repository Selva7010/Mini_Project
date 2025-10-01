import React, { useEffect, useState } from 'react'

const Employeedata = () => {
  const [name, setname]=useState([])
  
  useEffect(()=>{
  const employeedata=async()=>{
  const response=await fetch("https://68ca7e64430c4476c349b244.mockapi.io/Employee_Personal_Information")
  const data=await response.json()
  setname(data)

  }
  employeedata()
  },[])




  return (
    <div>
      <div className="header bg-blue-600 flex justify-center p-10">
        <a href="" className='bg-white p-5 m-5 text-xl font-bold text-blue-600 hover:bg-blue-900 hover:text-white'>Employee Details</a>
        <a href="/New_Employee" className='bg-white p-5 m-5 text-xl font-bold text-blue-600 hover:bg-blue-900 hover:text-white'>New Employee</a>
      </div>
      <div className="back text-center mt-5">
            <a href="/HRportal" className=''><i class="bi bi-arrow-left-short"></i>Back</a>
        </div>

      <div className="Employee-details p-5">
        
            <table className='w-full border table'>
          <thead>
            <tr className='bg-blue-500 text-white'>
              <th className='w-20 border p-2'>S.NO</th>
              <th className='w-20 border p-2'>ID</th>
              <th className='w-80 border p-2'>Name</th>
              <th className='border p-2'>Age</th>
              <th className='w-40 border p-2'>D.O.B</th>
              <th className='w-40 border p-2'>D.O.J</th>
              <th className='w-60 border p-2'>Mobile Number</th>
              <th className='w-60 border p-2'>City</th>
              <th className='border p-2'>Aadhar Number</th>
            </tr>
          </thead>
          {name.map((empdata)=>(
          <tbody key={empdata.id}>
            <tr>
              <td className='w-20 border p-2 text-center'>{empdata.id}</td>
              <td className='w-20 border p-2 text-center'>{empdata.Roll}</td>
              <td className='w-80 border p-2'>{empdata.Ename}</td>
              <td className='border p-2 text-center'>{empdata.age}</td>
              <td className='w-40 border p-2 text-center'>{empdata.DOB}</td>
              <td className='w-40 border p-2 text-center'>{empdata.DOJ}</td>
              <td className='w-60 border p-2 text-center'>{empdata.phone}</td>
              <td className='w-60 border p-2 text-center'>{empdata.city}</td>
              <td className='border p-2 text-center'>{empdata.aadharnumber}</td>
            </tr>
          </tbody>
          ))}
        </table>
        
        
      </div>
    </div>
  )
}

export default Employeedata
