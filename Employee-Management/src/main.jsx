import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import './index.css'
import Home from './Pages/Home'
import Employee from './Routes'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Employee}/>
  </StrictMode>,
)
