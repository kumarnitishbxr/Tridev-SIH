import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LoginPage from "./Pages/LoginPage";
import SearchPage from "./Pages/SearchPage";
import UploadPage from "./Pages/UploadPage";
import DocumentPage from "./Pages/DocumentPage";
import InboxPage from "./Pages/InboxPage";
import AdminUploadDashboard from "./Pages/AdminUploadDashboard";
import AdminExecutiveDashboard from "./Pages/AdminExecutiveDashboard";



export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-base-100">

        <Navbar />

        <div className="p-4">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/doc/:id" element={<DocumentPage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/admin/upload" element={<AdminUploadDashboard />} />
            <Route path="/admin/executive" element={<AdminExecutiveDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
