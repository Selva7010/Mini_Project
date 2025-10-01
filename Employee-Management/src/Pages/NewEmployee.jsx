import React, { useState } from 'react'

const NewEmployee = () => {
    const[Employee, setEmployee]=useState({
        Roll:"",
        Ename:"",
        age:"",
        DOB:"",
        DOJ:"",
        phone:"",
        city:"",
        aadharnumber:"",
        address:""

    })
    const [formError, setformError]=useState({})

    const [success, setsuccess]=useState("")

    const employeeValidate=()=>{
        const formError={}
        if(!Employee.Roll){
            formError.Roll="Please Enter Roll Number"
        }
        if(!Employee.Ename){
            formError.Ename="Enter your Name"
        }
        if(!Employee.age){
            formError.age="Enter your Age"
        }
        if(!Employee.DOB){
            formError.DOB="Enter your DOB"
        }
        if(!Employee.DOJ){
            formError.DOJ="Enter your DOJ"
        }
        if(!Employee.phone){
            formError.phone="Enter your Mobile Number"
        }
        if(!Employee.city){
            formError.city="Enter your City"
        }
        if(!Employee.aadharnumber){
            formError.aadharnumber="Enter your Aadhar Number"
        }
        
            else if(Employee.aadharnumber.length !== 16){
                formError.aadharnumber="Enter 16 Digit Number"
            }
        if(!Employee.address){
            formError.address="Enter your Address"
        }
        return formError
    }

    const handleChange=(event)=>{
        setEmployee({...Employee, [event.target.name]: event.target.value})
        setformError({...formError, [event.target.name]: ""})
        setsuccess("")
    }


    const EmployeeSubmit=async(event)=>{
        event.preventDefault()
        const validationError=employeeValidate()
        if(Object.keys(validationError).length>0){
            setformError(validationError)
            return
        }

        const response=await fetch("https://68ca7e64430c4476c349b244.mockapi.io/Employee_Personal_Information",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(Employee)
        })
        if(response.ok){
            setEmployee({Roll:"", Ename:"", age:"", DOB:"", DOJ:"", phone:"", city:"", aadharnumber:"", address:""})
            setsuccess("Your Data is Successfully added")
        }


    }



  return (
    <div>
      <div className="header bg-blue-600 flex justify-center p-10">
        <a href="/Employee" className='bg-white p-5 m-5 text-xl font-bold text-blue-600 hover:bg-blue-900 hover:text-white'>Employee Details</a>
        <a href="/New_Employee" className='bg-white p-5 m-5 text-xl font-bold text-blue-600 hover:bg-blue-900 hover:text-white'>New Employee</a>
      </div>

      <div className="registration">
        <h1 className='text-center p-3 text-xl font-semibold underline'>New Employee Registration</h1>

        {success && <div className='text-lg text-green-600 text-center'>{success}<i class="bi bi-check-circle-fill ml-3 text-xl"></i></div>}

        <div className="from-container p-10 flex justify-center">
            <div className='w-130 border border-gray-300 p-5 flex justify-center'>
            <form onSubmit={EmployeeSubmit} noValidate className='w-100'>
               <div>
                    <label htmlFor="" className='text-xl '>Roll : <br />
                        <input type="text" placeholder='Roll Number' className=' border border-gray-400 p-2 w-full mb-3 mt-1' name='Roll' value={Employee.Roll} onChange={handleChange}/>
                        {formError.Roll && <p className="text-red-500 text-sm mb-2">{formError.Roll}</p>}
                    </label>
                </div> 
                <div>
                    <label htmlFor="" className='text-xl '>Name : <br />
                        <input type="text" placeholder='Name' className=' border border-gray-400 p-2 w-full mb-3 mt-1' name='Ename' value={Employee.Ename} onChange={handleChange}/>
                        {formError.Ename && <p className="text-red-500 text-sm mb-2">{formError.Ename}</p>}
                    </label>
                </div> 
                <div>
                    <label htmlFor="" className='text-xl'>Age : <br />
                        <input type="number" placeholder='Age' className=' border border-gray-400 p-2 w-full mb-3 mt-1' name='age' value={Employee.age} onChange={handleChange}/>
                        {formError.age && <p className="text-red-500 text-sm mb-2 ">{formError.age}</p>}
                    </label>
                </div>
                <div>
                    <label htmlFor="" className='text-xl '>D.O.B : <br />
                        <input type="date" placeholder='D.O.B' className='border border-gray-400 p-2 w-full mb-3 mt-1' name='DOB' value={Employee.DOB} onChange={handleChange}/>
                        {formError.DOB && <p className="text-red-500 text-sm mb-2 ">{formError.DOB}</p>}
                    </label>
                </div>  
                <div>
                    <label htmlFor="" className='text-xl '>D.O.J : <br />
                        <input type="date" placeholder='D.O.J' className='border border-gray-400 p-2 w-full mb-3 mt-1' name='DOJ' value={Employee.DOJ} onChange={handleChange}/>
                        {formError.DOJ && <p className="text-red-500 text-sm mb-2 ">{formError.DOJ}</p>}
                    </label>
                </div>  
               
               
                <div>
                    <label htmlFor="" className='text-xl'>Mobile Number : <br />
                        <input type="text" placeholder='Mobile Number' className=' border border-gray-400 p-2 w-full mb-3 mt-1' name='phone' value={Employee.phone} onChange={handleChange}/>
                        {formError.phone && <p className="text-red-500 text-sm mb-2">{formError.phone}</p>}

                    </label>
                </div>
                <div>
                    <label htmlFor="" className='text-xl  '>City : <br />
                        <input type="text" placeholder='City' className=' border border-gray-400 p-2 w-full mb-3 mt-1' name='city' value={Employee.city} onChange={handleChange}/>
                        {formError.city && <p className="text-red-500 text-sm mb-2 ">{formError.city}</p>}
                    </label>
                </div>   
                <div>
                    <label htmlFor="" className='text-xl  '>Aadhar Number : <br />
                        <input type="text" placeholder='Aadhar Number' className='border border-gray-400 p-2 w-full mb-3 mt-1' name='aadharnumber' value={Employee.aadharnumber} onChange={handleChange}/>
                        {formError.aadharnumber && <p className="text-red-500 text-sm mb-2 ">{formError.aadharnumber}</p>}
                    </label>
                </div> 
                
                
              
                    <div>
                    <label htmlFor="" className='text-xl'>Address : <br />
                        <input type="text" placeholder='address' className='border border-gray-400 p-2 w-full mb-3 mt-1' name='address' value={Employee.address} onChange={handleChange}/>
                        {formError.address && <p className="text-red-500 text-sm mb-2">{formError.address}</p>}
                    </label>
                    
                </div>
             
                <div className="button mt-10 flex justify-center">
                    <button type='submit' className='bg-green-600 p-3 w-50 rounded text-xl text-white'>Submit</button>
                </div>
            </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default NewEmployee
