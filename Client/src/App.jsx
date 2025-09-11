import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import DocumentPage from "./Pages/DocumentPage";
import InboxPage from "./Pages/InboxPage";
import Admin from './Pages/Admin'
import AdminUploadDashboard from "./Components/AdminUploadDashboard";
import AdminExecutiveDashboard from "./Components/AdminExecutiveDashboard";
import UploadPage from "./Pages/UploadPage";
// import SearchPage from "./Pages/Home";



export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-base-100">


        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home /> } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/doc/:id" element={<DocumentPage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/admin" element={<Admin/> } />
            <Route path="/admin/upload" element={<AdminUploadDashboard />} />
            <Route path="/admin/executive" element={<AdminExecutiveDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
