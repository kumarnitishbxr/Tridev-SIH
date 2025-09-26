
import React, { useState } from 'react';
import UploadFile from './UploadFile';
import {
  Users,
  FileText,
  Upload,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter,
  Download,
  Trash2,
  Edit,
  Plus,
  Bell,
  Settings,
  LogOut,
  Menu
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [documents, setDocuments] = useState([
    { id: 1, name: 'Contract_Agreement.pdf', uploader: 'John Doe', uploadDate: '2024-01-15', status: 'pending', size: '2.4 MB' },
    { id: 2, name: 'Financial_Report.xlsx', uploader: 'Jane Smith', uploadDate: '2024-01-14', status: 'approved', size: '1.2 MB' },
    { id: 3, name: 'Project_Proposal.docx', uploader: 'Mike Johnson', uploadDate: '2024-01-13', status: 'rejected', size: '890 KB' },
    { id: 4, name: 'Invoice_Q1.pdf', uploader: 'Sarah Wilson', uploadDate: '2024-01-12', status: 'pending', size: '456 KB' },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', department: 'maintenance', role: 'User', status: 'Active', joinDate: '2024-01-10' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'civil', role: 'Manager', status: 'Active', joinDate: '2024-01-08' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', department: 'operational', role: 'User', status: 'Inactive', joinDate: '2024-01-05' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', department: 'finance', role: 'User', status: 'Active', joinDate: '2024-01-03' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleDocumentAction = (docId, action) => {
    setDocuments(docs =>
      docs.map(doc =>
        doc.id === docId ? { ...doc, status: action } : doc
      )
    );
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploader.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
          <p className={`text-xs sm:text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change} from last month
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar (Desktop + Mobile) */}
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} w-60 bg-white shadow-lg border-r border-gray-200 transition-transform duration-200 ease-in-out z-40 lg:translate-x-0`}>
        <div className="p-6 border-b border-gray-200 flex justify-between items-center lg:block">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          {/* Mobile Close Button */}
          <button className="lg:hidden text-gray-700" onClick={() => setSidebarOpen(false)}>
            ✕
          </button>
        </div>

        <nav className="mt-6">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: FileText },
            { id: 'documents', label: 'Documents', icon: FileText },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'upload', label: 'Upload', icon: Upload },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${activeTab === item.id ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-600' : 'text-gray-700'}`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button className="flex items-center text-gray-700 hover:text-gray-900">
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </button>
            <button className="text-gray-700 hover:text-gray-900">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-60">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Mobile Sidebar Toggle */}
            <button className="lg:hidden text-gray-700" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 capitalize">{activeTab}</h2>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard icon={FileText} title="Total Documents" value="1,247" change="+12%" color="bg-blue-500" />
                <StatCard icon={CheckCircle} title="Approved" value="892" change="+8%" color="bg-green-500" />
                <StatCard icon={XCircle} title="Pending" value="234" change="+15%" color="bg-yellow-500" />
                <StatCard icon={Users} title="Active Users" value="156" change="+3%" color="bg-purple-500" />
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Documents</h3>
                <div className="space-y-3">
                  {documents.slice(0, 3).map(doc => (
                    <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-500">by {doc.uploader}</p>
                        </div>
                      </div>
                      <span className={`mt-2 sm:mt-0 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              {/* Search + Filter */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <select
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button className="flex items-center px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </button>
                  </div>
                </div>
              </div>

              {/* Table (scrollable on mobile) */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploader</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Upload Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDocuments.map(doc => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{doc.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{doc.uploader}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{doc.uploadDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{doc.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900"><Eye className="w-4 h-4" /></button>
                          <button className="text-green-600 hover:text-green-900"><Download className="w-4 h-4" /></button>
                          {doc.status === 'pending' && (
                            <>
                              <button onClick={() => handleDocumentAction(doc.id, 'approved')} className="text-green-600 hover:text-green-900"><CheckCircle className="w-4 h-4" /></button>
                              <button onClick={() => handleDocumentAction(doc.id, 'rejected')} className="text-red-600 hover:text-red-900"><XCircle className="w-4 h-4" /></button>
                            </>
                          )}
                          <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Search + Add User */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </button>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap flex items-center">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.joinDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900"><Edit className="w-4 h-4" /></button>
                          <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'upload' && <UploadFile />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
