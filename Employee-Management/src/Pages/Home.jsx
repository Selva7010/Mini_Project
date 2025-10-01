import Login from './Login'
import HomeImage from '../assets/HomeImage.jpg'
import { useEffect, useState } from 'react'



function Home() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
 
        const response = await fetch(
          "https://68ca7e64430c4476c349b244.mockapi.io/Employee_Personal_Information"
        );
        const data = await response.json();
        setCount(data.length);
       
     
    };

    fetchEmployees();
  }, []);

  

  return (
    <div>
      <div className="home w-full h-screen">
        <div className="heading bg-blue-500 flex justify-between h-5 items-center p-10">
            <h1 className='text-4xl font-bold text-white'><span className='text-yellow-300'><i className='underline'>MSV</i></span> Metals Pvt.Ltd</h1>
        </div> 

    
      <div className="Homeimage relative bg-blue-900 ">
        <img src={HomeImage} alt="" className='w-full h-162 opacity-50'/>

        <div className="portal w-full h-150 flex justify-center items-center absolute top-0 ">
            <div className="container flex h-50 rounded-2xl justify-center items-center">
              
                <a href="/HRLogin" className='bg-blue-500 flex justify-center items-center text-white font-semibold text-2xl rounded hover:bg-blue-700 w-80 h-40 m-5'>HR Portal</a>
              
              
                <a href="/manager" className='w-80 h-40 flex justify-center items-center bg-blue-500 text-center text-white font-semibold text-2xl rounded hover:bg-blue-700 m-5'>Managers Portal</a>
              
                
                  <a href="/Employee_Profile" className='w-80 h-40 flex justify-center items-center bg-blue-500 text-center text-white font-semibold text-2xl rounded hover:bg-blue-700 m-5'>Employees Portal</a>
                
                
                  <a href="" className='w-80 h-40 bg-blue-500 flex justify-center items-center text-center text-white font-semibold text-2xl rounded hover:bg-blue-700 m-5'><p className="text-xl mt-2">Total Employees : {count}</p></a>
                
            </div>
             
        </div>
        </div>          
      </div>
    </div>
  )
}

export default Home
