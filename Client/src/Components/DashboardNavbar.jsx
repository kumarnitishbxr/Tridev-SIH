import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X,
  Home,
  FileText,
  Users,
  BarChart3,
  Calendar,
  MessageSquare,
  Shield,
  HelpCircle,
  Moon,
  Sun,
  Globe,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const DashboardNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Sample user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@company.com',
    role: 'Engineering Manager',
    avatar: null, // Using initials instead
    department: 'Engineering'
  };

  // Sample notifications
  const notifications = [
    {
      id: 1,
      type: 'urgent',
      title: 'System Alert',
      message: 'HVAC system failure in Building C requires immediate attention',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Document Approved',
      message: 'Safety compliance checklist has been approved by management',
      time: '2 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Meeting Reminder',
      message: 'Engineering team meeting scheduled for 3:00 PM today',
      time: '4 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'warning',
      title: 'Maintenance Due',
      message: 'Elevator maintenance inspection is overdue',
      time: '1 day ago',
      read: false
    },
    {
      id: 5,
      type: 'info',
      title: 'New Team Member',
      message: 'Sarah Chen has joined the Engineering department',
      time: '2 days ago',
      read: true
    }
  ];

  // Navigation items
  const navItems = [
    // { name: 'Dashboard', icon: Home, href: '#', active: true },
    // { name: 'Teams', icon: Users, href: '#' },
    { name: 'Analytics', icon: BarChart3, href: '#' },
    { name: 'Calendar', icon: Calendar, href: '#', badge: '3' },
    { name: 'Documents', icon: FileText, href: '#', badge: '12' },
    { name: 'Messages', icon: MessageSquare, href: '#' }
  ];

  // Quick actions
  const quickActions = [
    { name: 'Upload Document', icon: FileText, color: 'bg-blue-500' },
    { name: 'New Project', icon: Zap, color: 'bg-green-500' },
    { name: 'Send Message', icon: MessageSquare, color: 'bg-purple-500' },
    { name: 'Schedule Meeting', icon: Calendar, color: 'bg-orange-500' }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Bell className="w-4 h-4 text-blue-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Section - Logo & Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  KMRL
                </h1>
                <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Engineering Portal
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                    item.active
                      ? isDarkMode
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-blue-50 text-blue-700'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className={`relative ${isSearchFocused ? 'ring-2 ring-blue-500' : ''} rounded-lg`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <input
                type="text"
                placeholder="Search documents, projects, people..."
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg text-sm transition-colors ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-700'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white'
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchQuery && (
                <div className={`absolute top-full left-0 right-0 mt-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg shadow-lg max-h-96 overflow-y-auto`}>
                  <div className="p-3">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Search results for "{searchQuery}"
                    </p>
                    <div className="mt-2 space-y-2">
                      <div className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} cursor-pointer`}>
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <div>
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              HVAC Maintenance Report
                            </p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              Engineering • Updated 2 hours ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Actions & Profile */}
          <div className="flex items-center space-x-4">
            
            {/* Quick Actions (Desktop only) */}
            <div className="hidden xl:flex items-center space-x-2">
              {quickActions.slice(0, 2).map((action) => (
                <button
                  key={action.name}
                  className={`${action.color} p-2 rounded-lg hover:opacity-90 transition-opacity`}
                  title={action.name}
                >
                  <action.icon className="w-4 h-4 text-white" />
                </button>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className={`relative p-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationOpen && (
                <div className={`absolute right-0 mt-2 w-80 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} z-50`}>
                  <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Notifications
                      </h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {unreadCount} new
                      </span>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} ${
                          !notification.read ? (isDarkMode ? 'bg-gray-750' : 'bg-blue-50') : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {notification.title}
                            </p>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                              {notification.message}
                            </p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <button className={`text-sm ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium`}>
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  {/* <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user.name}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {user.role}
                  </p> */}
                </div>
                {/* <ChevronDown className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} /> */}
              </button>

              {isProfileOpen && (
                <div className={`absolute right-0 mt-2 w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} z-50`}>
                  <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user.name}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {user.email}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {user.department}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    {[
                      { name: 'My Profile', icon: User },
                      { name: 'Settings', icon: Settings },
                      { name: 'Help & Support', icon: HelpCircle },
                      { name: 'Privacy', icon: Shield }
                    ].map((item) => (
                      <a
                        key={item.name}
                        href="#"
                        className={`flex items-center space-x-3 px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                  <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <a
                      href="#"
                      className={`flex items-center space-x-3 px-4 py-3 text-sm ${isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'}`}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden border-t ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <div className="px-2 py-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium ${
                    item.active
                      ? isDarkMode
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-blue-50 text-blue-700'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>
            
            {/* Mobile Search */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className={`block w-full pl-10 pr-3 py-2 border rounded-lg text-sm ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
            </div>

            {/* Mobile Quick Actions */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                Quick Actions
              </p>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.name}
                    className={`flex items-center space-x-2 p-3 rounded-lg ${action.color} hover:opacity-90 transition-opacity`}
                  >
                    <action.icon className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">{action.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DashboardNavbar;