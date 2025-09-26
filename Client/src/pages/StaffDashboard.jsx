import React, { useState } from 'react';
import { Search, FileText, Download, Eye, Calendar, Building2, Shield, Users, AlertCircle, Gavel, Leaf } from 'lucide-react';

const StaffDashboard = () => {

  const [user, setUser] = useState({
    name: 'John Smith',
    department: 'Engineering',
    role: 'Senior Engineer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('department'); // 'department' or 'public'

  // Mock data for department documents
  const departmentDocuments = {
    'Engineering': [
      { id: 1, name: 'Technical Specifications Q3 2025', type: 'PDF', size: '2.3 MB', date: '2025-09-20', category: 'technical', restricted: false },
      { id: 2, name: 'Project Architecture Guidelines', type: 'DOC', size: '1.8 MB', date: '2025-09-18', category: 'guidelines', restricted: true },
      { id: 3, name: 'Engineering Drawing', type: 'XLSX', size: '4.1 MB', date: '2025-09-15', category: 'reports', restricted: false },
      // { id: 4, name: 'Code Review Standards', type: 'PDF', size: '856 KB', date: '2025-09-12', category: 'standards', restricted: false },
      { id: 5, name: 'Infrastructure Deployment Guide', type: 'PDF', size: '3.2 MB', date: '2025-09-10', category: 'technical', restricted: true },
    ],
    'Marketing': [
      { id: 6, name: 'Campaign Performance Analysis', type: 'XLSX', size: '2.1 MB', date: '2025-09-19', category: 'reports', restricted: false },
      { id: 7, name: 'Brand Guidelines 2025', type: 'PDF', size: '5.4 MB', date: '2025-09-17', category: 'guidelines', restricted: false },
      { id: 8, name: 'Market Research Findings', type: 'PPT', size: '12.3 MB', date: '2025-09-14', category: 'research', restricted: true },
    ],
    'Finance': [
      { id: 9, name: 'Budget Allocation Q4 2025', type: 'XLSX', size: '1.9 MB', date: '2025-09-21', category: 'budget', restricted: true },
      { id: 10, name: 'Financial Compliance Report', type: 'PDF', size: '2.7 MB', date: '2025-09-16', category: 'compliance', restricted: false },
    ]
  };

  
  // Public documents accessible to all staff
  const publicDocuments = [
    { id: 11, name: 'Employee Handbook 2025', type: 'PDF', size: '3.4 MB', date: '2025-09-01', category: 'hr-policies', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { id: 12, name: 'Code of Conduct', type: 'PDF', size: '1.2 MB', date: '2025-08-15', category: 'hr-policies', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { id: 13, name: 'Data Protection Regulations', type: 'PDF', size: '2.8 MB', date: '2025-09-05', category: 'regulatory-guidelines', icon: Shield, color: 'bg-purple-100 text-purple-600' },
    { id: 14, name: 'Industry Compliance Standards', type: 'DOC', size: '1.9 MB', date: '2025-08-28', category: 'regulatory-guidelines', icon: Shield, color: 'bg-purple-100 text-purple-600' },
    { id: 15, name: 'Carbon Footprint Assessment 2025', type: 'PDF', size: '4.2 MB', date: '2025-09-10', category: 'environmental-impact', icon: Leaf, color: 'bg-green-100 text-green-600' },
    { id: 16, name: 'Sustainability Initiative Report', type: 'PDF', size: '3.1 MB', date: '2025-08-20', category: 'environmental-impact', icon: Leaf, color: 'bg-green-100 text-green-600' },
    { id: 17, name: 'Workplace Safety Manual', type: 'PDF', size: '2.5 MB', date: '2025-09-12', category: 'safety-circulars', icon: AlertCircle, color: 'bg-orange-100 text-orange-600' },
    { id: 18, name: 'Emergency Procedures Update', type: 'DOC', size: '980 KB', date: '2025-09-08', category: 'safety-circulars', icon: AlertCircle, color: 'bg-orange-100 text-orange-600' },
    { id: 19, name: 'Contract Law Guidelines', type: 'PDF', size: '3.8 MB', date: '2025-09-03', category: 'legal-opinions', icon: Gavel, color: 'bg-red-100 text-red-600' },
    { id: 20, name: 'Intellectual Property Policy', type: 'PDF', size: '2.1 MB', date: '2025-08-25', category: 'legal-opinions', icon: Gavel, color: 'bg-red-100 text-red-600' },
  ];

  const publicCategories = [
    { id: 'hr-policies', name: 'HR Policies', icon: Users, color: 'bg-blue-100 text-blue-600', count: 2 },
    { id: 'regulatory-guidelines', name: 'Regulatory Guidelines', icon: Shield, color: 'bg-purple-100 text-purple-600', count: 2 },
    { id: 'environmental-impact', name: 'Environmental Impact', icon: Leaf, color: 'bg-green-100 text-green-600', count: 2 },
    { id: 'safety-circulars', name: 'Safety Circulars', icon: AlertCircle, color: 'bg-orange-100 text-orange-600', count: 2 },
    { id: 'legal-opinions', name: 'Legal Opinions', icon: Gavel, color: 'bg-red-100 text-red-600', count: 2 },
  ];

  const currentDeptDocs = departmentDocuments[user.department] || [];
  
  const filteredDeptDocs = currentDeptDocs.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || doc.category === selectedCategory)
  );

  const filteredPublicDocs = publicDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || doc.category === selectedCategory)
  );

  const getFileIcon = () => {
    return <FileText className="w-5 h-5" />;
  };

  const formatFileSize = (size) => size;

  const DocumentCard = ({ doc, isPublic = false }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg ${isPublic ? doc.color : 'bg-gray-100 text-gray-600'}`}>
            {isPublic ? <doc.icon className="w-5 h-5" /> : getFileIcon(doc.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
              <span>{doc.type}</span>
              <span>{formatFileSize(doc.size)}</span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {doc.date}
              </span>
            </div>
          </div>
        </div>
        {doc.restricted && (
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
            Restricted
          </span>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
          <Eye className="w-4 h-4" />
          <span>View</span>
        </button>
        <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors">
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Document Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.department} • {user.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setViewMode('department')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'department'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Department
          </button>
          <button
            onClick={() => setViewMode('public')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'public'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Public Documents
          </button>
        </div>

        {viewMode === 'department' ? (
          // Department View
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {user.department} Department Documents
              </h2>
              <p className="text-gray-600">Access documents specific to your department</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="technical">Technical</option>
                <option value="guidelines">Guidelines</option>
                <option value="reports">Reports</option>
                <option value="standards">Standards</option>
              </select>
            </div>

            {/* Department Documents Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredDeptDocs.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>

            {filteredDeptDocs.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </>
        ) : (
          // Public Documents View
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Public Documents</h2>
              <p className="text-gray-600">Company-wide policies, guidelines, and important documents</p>
            </div>

            {/* Public Document Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {publicCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedCategory === category.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded-lg w-fit mb-2 ${category.color}`}>
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm">{category.name}</h3>
                  <p className="text-gray-500 text-xs mt-1">{category.count} documents</p>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search public documents..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Public Documents Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPublicDocs.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} isPublic={true} />
              ))}
            </div>

            {filteredPublicDocs.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;