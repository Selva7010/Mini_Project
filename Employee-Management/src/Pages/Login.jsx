import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Home from './Home'
import LoginImage from '../assets/loginbackimage.jpg'


const Login = () => {
    const navigate=useNavigate()

    const [username, setUsername]=useState("")
    const [password, setPassword]=useState("")
    const [loginError, setloginError]=useState("")
    const [Success, setSuccess]=useState("")

    const handleLogin = async(event) =>{
        event.preventDefault()
        setloginError("")
        setSuccess("")
        
        if(!username || !password){
            setloginError("Please Enter Username & Password")
            return 
        }

        const response = await fetch("https://6889afa84c55d5c739531aef.mockapi.io/Employee_Data")
        const data = await response.json()

        const matchusers = data.find((user)=>
            user.name === username  && user.password === password
        )
        if (matchusers){
            setSuccess("Login Successfully...")
            setUsername("")
            setPassword("")
            navigate("/Home")
            
        }
        else{
            setloginError("Login Failed")
        }
         
    }

   

  return (
    <div className='flex'>
      <div className="left bg-blue-900 w-250 h-screen relative">
                   <img src={LoginImage} alt="" className='h-screen opacity-50'/>
      
                  <div className="usericon absolute top-0 left-0 text-center mt-70 ml-110">
                    
                      {/* <h1 className='text-4xl font-bold text-center text-white mb-10'>Employee Management APP</h1> */}
                      <i className="bi bi-person-circle text-9xl text-white"></i>
                  </div>
                  
              </div>

        <div className='h-screen flex items-center ml-16'>
      <div className="form-container w-100 p-6 border border-gray-300 shadow-lg rounded-2xl">
        <div className="buttons flex justify-center mb-5">
            <a href="/" className=' bg-blue-500  p-3 rounded-3xl text-white w-50 font-bold text-md'>Login</a>
            <a href="/SignUp" className='border-2  p-3 rounded-3xl text-blue-500 ml-3 hover:bg-blue-500 hover:text-white font-bold text-md'>SignUp</a>
        </div>
        
        <form onSubmit={handleLogin} >
            <h1 className='text-center text-4xl font-bold mb-5 text-blue-500'>Login</h1>
            
            {loginError && <div className='text-red-600 text-center text-lg mb-3 font-semibold'>{loginError}</div>}
            {Success && <div className='text-green-500 text-center text-lg mb-3 font-semibold'>{Success}</div>}

            <label htmlFor="" className='text-lg'>Username : <br />
               <input className='w-full border-b-1 outline-0 border-0 p-1  mb-5' type="text"  placeholder='Username (or) Mobile Number' name='name' value={username} onChange={(event)=>setUsername(event.target.value)} /><br />
            </label>
            

            <label htmlFor="" className='text-lg'>Password : <br />
                <input className='w-full border-b-1 outline-0 border-0 p-1 mb-3' type="password" placeholder='Password' name='Password' value={password} onChange={(event)=>setPassword(event.target.value)}/><br />
            </label>
           
            <button className='bg-blue-500 hover:bg-blue-700 p-3 w-full text-white mt-2 text-xl rounded' type='submit'>Login</button>
        </form>
      </div>
    </div>

    </div>
  )
}

export default Login
