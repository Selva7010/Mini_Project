import {createBrowserRouter} from 'react-router-dom'
import Home from './Pages/Home'
import UserLoginForm from './Pages/UserSignUpForm'
import Login from './Pages/Login'
import HRLogin from './Pages/HRLogin'
import HRportal from './Pages/HRportal'
import HRUserform from './Pages/HRUserform'
import Employeedata from './Pages/Employeedata'
import NewEmployee from './Pages/NewEmployee'
import EmployeeLogin from './Pages/EmployeeLogin'
import Employeemainpage from './Pages/Employeemainpage'
import HRLeaveApproval from './Pages/LeaveApplication'
import LeaveStatus from './Pages/LeaveStatus'
import Payroll from './Pages/Payroll'
import Payment from './Pages/Payment'
import EmployeeSalaryDetails from './Pages/Salarydetails'
import EmployeeTracker from './Pages/manager'
import ScheduleManager from './Pages/Schedule'



const Employee = createBrowserRouter([
     {
        path:"/",
        element:<Login/>
    },
    {
        path:"/SignUp",
        element:<UserLoginForm/>
    },
    {
        path:"/Home",
        element:<Home/>
    },
    {
        path:"/HRLogin",
        element:<HRLogin/>
    },
    {
        path:"/HRUserform",
        element:<HRUserform/>
    },
    {
        path:"/HRportal",
        element:<HRportal/>
    },
    {
        path:"/Employee",
        element:<Employeedata/>
    },
    {
        path:"/New_Employee",
        element:<NewEmployee/>
    },
    {
        path:"/Employee_Profile",
        element:<EmployeeLogin />
    },
    {
        path:"/Employeemainpage",
        element:<Employeemainpage/>
    },
   
    {
        path:"/LeaveApplication",
        element:<HRLeaveApproval/>
    },
    {
        path:"/LeaveStatus",
        element:<LeaveStatus/>
    },
    {
        path:"/payroll",
        element:<Payroll/>
    },
    {
        path:"/payment",
        element:<Payment/>
    },
    {
        path:"/salary",
        element:<EmployeeSalaryDetails/>
    },
    {
        path:"/manager",
        element:<EmployeeTracker/>
    },
    // {
    //     path:"/schedule",
    //     element:<ScheduleManager/>
    // }

   

])
export default Employee