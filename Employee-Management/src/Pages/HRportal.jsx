import React from 'react'
import HomeImage from '../assets/home.jpeg'

function HRportal() {
  return (
    <div>
      <nav>
        <div className="navbar bg-blue-500 flex justify-between h-20 items-center p-5">
            <h1 className='text-3xl font-bold text-white'>HR Portal</h1>
            <div className="nav-links">
                <a href="/Employee" className='text-xl hover:bg-white hover:text-blue-900 m-3 p-2 rounded text-white font-semibold'>Employee Records</a>
                <a href="/payroll" className='text-xl hover:bg-white hover:text-blue-900 m-3 p-2 rounded text-white font-semibold'>Pay Roll</a>
                <a href="/LeaveApplication" className='text-xl hover:bg-white hover:text-blue-900 m-3 p-2 rounded text-white font-semibold'>Leave Application</a>
                <a href="/Home" className='text-xl m-3 p-2 rounded text-white font-semibold bg-red-600'>Logout</a>
            </div>
        </div>
      </nav>



      <div className="home bg-blue-900">
        <figure className="relative">
            <img className="w-full h-162 opacity-50" src={HomeImage} alt="image description" />

          <figcaption className="absolute px-4 text-lg text-red-600 bottom-60">
            <h1 className='text-4xl ml-25 font-semibold'>Welcome To</h1>
            <h1 className='text-8xl ml-25 font-bold text-white '>Our Factory</h1>
            <p className='text-xl ml-25 font-normal mt-5 text-yellow-900'><span className='bg-red-600 text-white'>A factory is a large industrial facility where goods are manufactured or processed, typically on a large scale. It houses a range of machinery, equipment, and</span> <span className='bg-red-600 text-white'>labor used in the transformation of raw materials into finished products.</span></p>
          </figcaption>
        </figure>
      </div>
      
    </div>
  )
}

export default HRportal
