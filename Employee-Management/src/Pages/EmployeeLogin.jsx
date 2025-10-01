import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import HRportal from './HRportal'
import EmployeeImage from '../assets/Employee.jpg'
import Employeemainpage from './Employeemainpage'


const EmployeeLogin = () => {
    const navigate=useNavigate()

    const [username, setUsername]=useState("")
    const [phone, setphone]=useState("")
    const [loginError, setloginError]=useState("")
    const [Success, setSuccess]=useState("")
    
    const handleLogin = async(event) =>{
        event.preventDefault()
        setloginError("")
        setSuccess("")
        
        if(!username || !phone){
            setloginError("Please Enter Correct Username Password")
            return 
        }

        const response = await fetch("https://68ca7e64430c4476c349b244.mockapi.io/Employee_Personal_Information")
        const data = await response.json()

        const matchUser = data.find((user)=>
            user.Ename === username && user.phone === phone
        )
        
        if (matchUser){
            setSuccess("Login Successfully...")
            setUsername("")
            setphone("")
            navigate("/Employeemainpage", { state: { employee: matchUser } })
            
        }
        else{
            setloginError("Login Failed")
        }
         
    }

   

  return (
    <div className='flex'>
      <div className="left bg-blue-900 w-250 h-screen relative">
                   <img src={EmployeeImage} alt="" className='h-screen opacity-50'/>
      
                  <div className="usericon absolute top-0 left-0 text-center mt-160 ml-110">
                    
                      <h1 className='text-4xl font-bold text-center text-white mb-10'>Employee</h1>
                      {/* <i className="bi bi-person-circle text-9xl text-white"></i> */}
                  </div>
                  
              </div>

        <div className='h-screen flex items-center ml-16'>
      <div className="form-container w-100 p-6 border border-gray-300 shadow-lg rounded-2xl">
        
        <form onSubmit={handleLogin} >
            <h1 className='text-center text-4xl font-bold mb-5 text-blue-500'>Login</h1>
            
            {loginError && <div className='text-red-600 text-center text-lg mb-3 font-semibold'>{loginError}</div>}
            {Success && <div className='text-green-500 text-center text-lg mb-3 font-semibold'>{Success}</div>}

            <label htmlFor="" className='text-lg'>Username : <br />
               <input className='w-full border-b-1 outline-0 border-0 p-1  mb-4 ' type="text" placeholder='Username' name='name' value={username} onChange={(event)=>setUsername(event.target.value)} /><br />
            </label>
            

            <label htmlFor="" className='text-lg'>Mobile Number : <br />
                <input className='w-full border-b-1 outline-0 border-0 p-1  mb-4' type="text" placeholder='Mobile Number' name='phone' value={phone} onChange={(event)=>setphone(event.target.value)}/><br />
            </label>
           
            <button className='bg-blue-500 hover:bg-blue-700 p-3 w-full text-white mt-2 text-xl rounded' type='submit'>Login</button>
        </form>
        <div className="back text-center mt-5">
            <a href="/Home" className=''><i className="bi bi-arrow-left-short"></i>Back</a>
        </div>
      </div>
    </div>

   
    </div>
    
  )
  
}

export default EmployeeLogin
