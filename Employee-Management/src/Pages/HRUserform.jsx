import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import HrImage from '../assets/HrImage.jpg'



const HRUserform = () => {
    const navigate=useNavigate()
   const [userData, setuserData] = useState({
    name: "",
    email: "",
    phone:"",
    password: "",
    confirmpassword:"",
  });

  const [formError, setformError] = useState({});
  

 
  const userValidate = () => {
    const formError = {};
    if (!userData.name) {
      formError.name = "Please Enter the Name";
    }

    if (!userData.email) {
      formError.email = "Please Enter the Email Id";
    } 
    else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      formError.email = "Invalid Email Id";
    }
    if(!userData.phone){
       formError.phone = "Please Enter the Phone Number"
    }
    if (!userData.password) {
      formError.password = "Please Enter the Password";
    }
    else if(userData.password.length < 6){
        formError.password = "Password must be at least 6 characters"
    }
    if(!userData.confirmpassword){
        formError.confirmpassword="Please Enter the Confirm Password"
    }
    else if (userData.password !== userData.confirmpassword){
        formError.confirmpassword="Password does not Match"
    }
    return formError;
  };


  const handleChange = (event) => {
    setuserData({ ...userData, [event.target.name]: event.target.value });
    setformError({ ...formError, [event.target.name]: "" });
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = userValidate();
    if (Object.keys(validationErrors).length > 0) {
      setformError(validationErrors);
      return;
    }

   
      const response = await fetch("https://6889afa84c55d5c739531aef.mockapi.io/HRPortal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setuserData({ name: "", email: "", phone:"", password: "", confirmpassword:"" });
        navigate("/HRLogin")
      } 
   
    
  };


  return (
    <div className='flex'>
        <div className="left bg-blue-900 w-250 h-screen relative">
                           <img src={HrImage} alt="" className='h-screen opacity-50'/>
              
                          <div className="usericon absolute top-0 left-0 text-center mt-160 ml-110">
                            
                              <h1 className='text-4xl font-bold text-center text-white mb-10'>HR Portal</h1>
                              {/* <i className="bi bi-person-circle text-9xl text-white"></i> */}
                          </div>
                          
                      </div>
    
    <div className='h-screen flex items-center ml-16'>
      <div className="form-container w-100 p-6 border border-gray-300 shadow-lg rounded-2xl">
        <div className="buttons flex justify-center mb-5">
            <a href="/HRLogin" className=' bg-blue-500 p-3 rounded-3xl text-white w-50'>Login</a>
            <a href="/HRUserform" className='border-2  p-3 rounded-3xl text-blue-500 ml-3 hover:bg-blue-500 hover:text-white '>SignUp</a>
        </div>
        <form onSubmit={handleSubmit} noValidate>
            <h1 className='text-center text-4xl font-bold mb-8 text-blue-500'>Sign Up</h1>
            
            <label htmlFor="" className='text-lg'>Name : <br />
               <input className='w-full border-b-1 outline-0 border-0 p-1  mb-1 ' type="text" placeholder='Name.....' name='name' value={userData.name} onChange={handleChange}/><br />
            </label>
            {formError.name && <p className="text-red-500 text-sm mb-2">{formError.name}</p>} 

            <label htmlFor="" className='text-lg'>Email : <br />
                <input className='w-full border-b-1 outline-0 border-0 p-1  mb-1' type="email" placeholder='Enter Your Email Address.....' name='email' value={userData.email} onChange={handleChange}/><br />
            </label>
            {formError.email && <p className="text-red-500 text-sm mb-2">{formError.email}</p>}

            <label htmlFor="" className='text-lg'>Phone Number : <br />
                <input className='w-full border-b-1 outline-0 border-0 p-1  mb-1'  type="text" placeholder='Enter Your Phone Number.....' name='phone' value={userData.phone} onChange={handleChange}/><br />
            </label>
            {formError.phone && <p className="text-red-500 text-sm mb-2">{formError.phone}</p>}

            <label htmlFor="" className='text-lg'>Password : <br />
                <input className='w-full border-b-1 outline-0 border-0 p-1  mb-1'  type="password" placeholder='Enter Your Password.....' name='password' value={userData.password} onChange={handleChange}/><br />
            </label>
            {formError.password && <p className="text-red-500 text-sm mb-2">{formError.password}</p>}

            <label htmlFor="" className='text-lg'>Confirm Password : <br />
                <input className='w-full border-b-1 outline-0 border-0 p-1 mb-1'  type="password" placeholder='Enter Your Confirm Password.....' name='confirmpassword' value={userData.confirmpassword} onChange={handleChange}/><br />
            </label>
            {formError.confirmpassword && <p className="text-red-500 text-sm mb-2">{formError.confirmpassword}</p>}

            <button className='bg-blue-500 hover:bg-blue-700 p-3 w-full text-white mt-2 text-xl rounded' type='submit'>Register</button>
            
        </form>
        <div className="back text-center mt-5">
            <a href="/Home" className=''><i class="bi bi-arrow-left-short"></i>Back</a>
        </div>
      </div>
    </div>
    </div>
  )
}

export default HRUserform
