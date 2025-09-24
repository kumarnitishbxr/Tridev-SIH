import { BrowserRouter , Routes, Route } from 'react-router-dom'
// import Navbar from './Components/Navbar'
// import Dashboard from './pages/DAshboard'
import Header from './Components/Header'
import DynamicHomepage from './pages/DynamicHomepage'
import AdminDashboard from './pages/AdminDashboard'
import MaintenanceDashboard from './pages/MaintenanceDashboard'
import LoginPage from './pages/Loginpage'
import StaffDashboard from './pages/StaffDashboard'
import FinanceDashboard from './pages/FinanceDashboard'
import UploadFile from './pages/UploadFile'



import './App.css'

function App() {

  return(
   <>
    <BrowserRouter>
    
      <Routes>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/' element={<DynamicHomepage/>} />
        <Route path='/admin' element={<AdminDashboard/>} />
        <Route path='/maintain' element={<MaintenanceDashboard/>} />
        <Route path='/staff' element={<StaffDashboard/>} />
        <Route path='/finance' element={<FinanceDashboard/>} />
        <Route path='/upload' element={<UploadFile/>} ></Route>
      </Routes>

    </BrowserRouter>
   
   </>
  )
  
}

export default App
