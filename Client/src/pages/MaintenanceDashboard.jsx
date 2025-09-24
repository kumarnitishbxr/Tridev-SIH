import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin,
  Bell,
  Search,
  BarChart3,
  Wrench,
  Calendar,
  User,
  AlertCircle,
 
} from 'lucide-react';

const MaintenanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('departments');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // Sample data
  const departments = [
    {
      id: 1,
      name: 'IT Department',
      head: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      location: 'Building A, Floor 3',
      status: 'active',
      totalRequests: 24,
      pendingRequests: 8,
      urgentRequests: 2,
      avgResponseTime: '2.5 hrs'
    },
    {
      id: 2,
      name: 'Facilities',
      head: 'Mike Rodriguez',
      email: 'mike.rodriguez@company.com',
      phone: '+1 (555) 234-5678',
      location: 'Building B, Ground Floor',
      status: 'maintenance',
      totalRequests: 31,
      pendingRequests: 12,
      urgentRequests: 5,
      avgResponseTime: '4.2 hrs'
    },
    {
      id: 3,
      name: 'Security',
      head: 'Lisa Chen',
      email: 'lisa.chen@company.com',
      phone: '+1 (555) 345-6789',
      location: 'Building A, Ground Floor',
      status: 'active',
      totalRequests: 18,
      pendingRequests: 3,
      urgentRequests: 1,
      avgResponseTime: '1.8 hrs'
    },
    {
      id: 4,
      name: 'HVAC Systems',
      head: 'David Park',
      email: 'david.park@company.com',
      phone: '+1 (555) 456-7890',
      location: 'Building C, Basement',
      status: 'maintenance',
      totalRequests: 15,
      pendingRequests: 6,
      urgentRequests: 3,
      avgResponseTime: '3.1 hrs'
    }
  ];

  const documents = [
    {
      id: 1,
      title: 'HVAC Maintenance Report - Q3',
      department: 'HVAC Systems',
      category: 'Equipment Maintenance',
      priority: 'high',
      status: 'approved',
      uploadDate: '2024-09-20',
      uploader: 'David Park',
      fileSize: '2.4 MB'
    },
    {
      id: 2,
      title: 'Fire Safety Inspection Checklist',
      department: 'Security',
      category: 'Safety Compliance',
      priority: 'high',
      status: 'pending',
      uploadDate: '2024-09-19',
      uploader: 'Lisa Chen',
      fileSize: '1.2 MB'
    },
    {
      id: 3,
      title: 'IT Equipment Budget Planning',
      department: 'IT Department',
      category: 'Budget Planning',
      priority: 'medium',
      status: 'under_review',
      uploadDate: '2024-09-18',
      uploader: 'Sarah Johnson',
      fileSize: '3.1 MB'
    },
    {
      id: 4,
      title: 'Facility Cleaning Schedule',
      department: 'Facilities',
      category: 'Facility Management',
      priority: 'low',
      status: 'rejected',
      uploadDate: '2024-09-17',
      uploader: 'Mike Rodriguez',
      fileSize: '0.8 MB'
    }
  ];

  const maintenanceTasks = [
    {
      id: 1,
      title: 'HVAC System Repair - Building A',
      assignee: 'David Park',
      priority: 'high',
      progress: 75,
      estimatedHours: 8,
      completedHours: 6,
      dueDate: '2024-09-23',
      status: 'in_progress'
    },
    {
      id: 2,
      title: 'Security Camera Installation',
      assignee: 'Lisa Chen',
      priority: 'medium',
      progress: 40,
      estimatedHours: 12,
      completedHours: 5,
      dueDate: '2024-09-25',
      status: 'in_progress'
    },
    {
      id: 3,
      title: 'Network Infrastructure Update',
      assignee: 'Sarah Johnson',
      priority: 'high',
      progress: 90,
      estimatedHours: 16,
      completedHours: 14,
      dueDate: '2024-09-22',
      status: 'in_progress'
    },
    {
      id: 4,
      title: 'Elevator Maintenance Check',
      assignee: 'Mike Rodriguez',
      priority: 'low',
      progress: 100,
      estimatedHours: 4,
      completedHours: 4,
      dueDate: '2024-09-20',
      status: 'completed'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'urgent',
      title: 'HVAC System Failure - Building C',
      time: '5 minutes ago',
      department: 'HVAC Systems'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Overdue Safety Inspection',
      time: '2 hours ago',
      department: 'Security'
    },
    {
      id: 3,
      type: 'info',
      title: 'Network Maintenance Completed',
      time: '4 hours ago',
      department: 'IT Department'
    },
    {
      id: 4,
      type: 'urgent',
      title: 'Security System Update Required',
      time: '6 hours ago',
      department: 'Security'
    },
    {
      id: 5,
      type: 'warning',
      title: 'Equipment Service Due',
      time: '1 day ago',
      department: 'Facilities'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'under_review': return 'text-blue-600 bg-blue-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-orange-600 bg-orange-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || doc.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Maintenance Dashboard</h1>
            </div>
            
            {/* Notification Center */}
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {alerts.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Departments</p>
                <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Tasks</p>
                <p className="text-2xl font-bold text-gray-900">
                  {maintenanceTasks.filter(t => t.status === 'in_progress').length}
                </p>
              </div>
              <Wrench className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Documents</p>
                <p className="text-2xl font-bold text-gray-900">
                  {documents.filter(d => d.status === 'pending').length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Urgent Alerts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {alerts.filter(a => a.type === 'urgent').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8" aria-label="Tabs">
            {[
              { id: 'departments', name: 'Departments', icon: Building2 },
              { id: 'documents', name: 'Documents', icon: FileText },
              { id: 'tasks', name: 'Maintenance Tasks', icon: Wrench },
              { id: 'alerts', name: 'Alerts', icon: Bell },
              { id: 'analytics', name: 'Analytics', icon: BarChart3 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'departments' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {departments.map((dept) => (
              <div key={dept.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
                    <p className="text-sm text-gray-600">{dept.head}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dept.status)}`}>
                    {dept.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{dept.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{dept.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{dept.location}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-600">Total Requests</p>
                    <p className="text-xl font-bold text-gray-900">{dept.totalRequests}</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-yellow-600">Pending</p>
                    <p className="text-xl font-bold text-yellow-700">{dept.pendingRequests}</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-red-600">Urgent</p>
                    <p className="text-xl font-bold text-red-700">{dept.urgentRequests}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-blue-600">Avg Response</p>
                    <p className="text-xl font-bold text-blue-700">{dept.avgResponseTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-white rounded-lg shadow-sm">
            {/* Filters */}
            <div className="p-6 border-b">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="under_review">Under Review</option>
                  <option value="rejected">Rejected</option>
                </select>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <option value="all">All Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            
            {/* Document List */}
            <div className="divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{doc.title}</h4>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Building2 className="w-4 h-4" />
                          <span>{doc.department}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{doc.uploader}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{doc.uploadDate}</span>
                        </span>
                        <span>{doc.fileSize}</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{doc.category}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(doc.priority)}`}>
                        {doc.priority} priority
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-6">
            {maintenanceTasks.map((task) => (
              <div key={task.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600">Assigned to: {task.assignee}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress: {task.progress}%</span>
                    <span>Due: {task.dueDate}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-600">Hours Completed</p>
                    <p className="text-lg font-bold text-gray-900">{task.completedHours}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-blue-600">Estimated Hours</p>
                    <p className="text-lg font-bold text-blue-700">{task.estimatedHours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Real-time Alerts</h3>
              <p className="text-sm text-gray-600">Monitor critical system notifications</p>
            </div>
            <div className="divide-y divide-gray-200">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                      <p className="text-sm text-gray-600">{alert.department}</p>
                      <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Request Trends */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Request Volume</h3>
              <div className="space-y-3">
                {departments.map((dept) => (
                  <div key={dept.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(dept.totalRequests / 35) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">{dept.totalRequests}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time Analytics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Response Times</h3>
              <div className="space-y-3">
                {departments.map((dept) => (
                  <div key={dept.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                    <span className="text-sm text-gray-600">{dept.avgResponseTime}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Status Breakdown */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Status Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-700">
                    {documents.filter(d => d.status === 'approved').length}
                  </p>
                  <p className="text-sm text-green-600">Approved</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-700">
                    {documents.filter(d => d.status === 'pending').length}
                  </p>
                  <p className="text-sm text-yellow-600">Pending</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-700">
                    {documents.filter(d => d.status === 'under_review').length}
                  </p>
                  <p className="text-sm text-blue-600">Under Review</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-700">
                    {documents.filter(d => d.status === 'rejected').length}
                  </p>
                  <p className="text-sm text-red-600">Rejected</p>
                </div>
              </div>
            </div>

            {/* Performance Indicators */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Task Completion Rate</span>
                    <span>87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Document Approval Rate</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>System Uptime</span>
                    <span>99.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '99.2%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceDashboard;