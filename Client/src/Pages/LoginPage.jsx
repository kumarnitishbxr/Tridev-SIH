/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { 
  Building2, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield,
  Users,
  Briefcase,
  Settings,
  Scale,
  Wrench,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ChevronDown
} from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    department: '',
    userId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);

  // Department options with icons and colors
  const departments = [
    {
      id: 'maintenance',
      name: 'Maintenance Department',
      icon: Wrench,
      color: 'from-orange-500 to-red-500',
      description: 'Facility & Equipment Management'
    },
    {
      id: 'operations',
      name: 'Operations Department',
      icon: Settings,
      color: 'from-blue-500 to-cyan-500',
      description: 'Business Operations & Process Management'
    },
    {
      id: 'finance',
      name: 'Finance Department',
      icon: Briefcase,
      color: 'from-green-500 to-emerald-500',
      description: 'Financial Planning & Analysis'
    },
    {
      id: 'engineering',
      name: 'Engineering Department',
      icon: Building2,
      color: 'from-purple-500 to-pink-500',
      description: 'Technical Design & Development'
    },
    {
      id: 'legal',
      name: 'Legal Department',
      icon: Scale,
      color: 'from-gray-600 to-gray-800',
      description: 'Legal Affairs & Compliance'
    }
  ];

  const selectedDepartment = departments.find(d => d.id === formData.department);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.department) {
      newErrors.department = 'Please select your department';
    }
    
    if (!formData.userId) {
      newErrors.userId = 'User ID is required';
    } else if (formData.userId.length < 3) {
      newErrors.userId = 'User ID must be at least 3 characters';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      alert(`Login successful!\nDepartment: ${selectedDepartment?.name}\nUser ID: ${formData.userId}`);
    }, 2000);
  };

  const selectDepartment = (dept) => {
    setFormData(prev => ({
      ...prev,
      department: dept.id
    }));
    setIsDepartmentOpen(false);
    if (errors.department) {
      setErrors(prev => ({
        ...prev,
        department: ''
      }));
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        {/* <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div> */}
      </div>

      {/* Login Container */}
      <div className="relative w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-4 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                <Sparkles className="w-3 h-3 text-white m-0.5 animate-spin" />
              </div>
            </div>
          </div>
          {/* <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1> */}
          <p className="text-gray-600">
            Sign in to access your department dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="space-y-4">
            
            {/* Department Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Department
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDepartmentOpen(!isDepartmentOpen)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${
                    errors.department 
                      ? 'border-red-300 bg-red-50' 
                      : selectedDepartment
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {selectedDepartment ? (
                      <>
                        <div className={`w-8 h-8 bg-gradient-to-r ${selectedDepartment.color} rounded-lg flex items-center justify-center`}>
                          <selectedDepartment.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-gray-900">{selectedDepartment.name}</div>
                          <div className="text-xs text-gray-500">{selectedDepartment.description}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <Users className="w-6 h-6 text-gray-400" />
                        <span className="text-gray-500">Select your department</span>
                      </>
                    )}
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    isDepartmentOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Department Dropdown */}
                {isDepartmentOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-10 max-h-80 overflow-y-auto">
                    {departments.map((dept) => (
                      <button
                        key={dept.id}
                        type="button"
                        onClick={() => selectDepartment(dept)}
                        className="w-full p-4 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-gradient-to-r ${dept.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <dept.icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{dept.name}</div>
                            <div className="text-xs text-gray-500">{dept.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.department && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.department}</span>
                </div>
              )}
            </div>

            {/* User ID Field */}
            <div className="space-y-2">
              <label htmlFor="userId" className="block text-sm font-semibold text-gray-700">
                User ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className={`w-5 h-5 ${errors.userId ? 'text-red-400' : 'text-gray-400'}`} />
                </div>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  defaultValue='samir_singh'
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                    errors.userId 
                      ? 'border-red-300 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 bg-gray-50 hover:border-blue-300 focus:border-blue-500 focus:bg-white'
                  }`}
                  placeholder="Enter your User ID"
                />
                {formData.userId && !errors.userId && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>
              {errors.userId && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.userId}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`w-5 h-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  defaultValue='Samir@123'
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                    errors.password 
                      ? 'border-red-300 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 bg-gray-50 hover:border-blue-300 focus:border-blue-500 focus:bg-white'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            {/* <button
              type="submit"
              
              disabled={isLoading}
              className={`w-full flex items-center justify-center space-x-3 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-300 via-blue-600 to-pink-600 hover:from-blue-200 hover:via-blue-700 hover:to-pink-400 hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button> */}

            <NavLink to="/admin">
              <button className="w-full flex items-center justify-center space-x-3 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform bg-gradient-to-r from-blue-300 via-blue-600 to-pink-600 hover:from-blue-200 hover:via-blue-700 hover:to-pink-400 hover:scale-105 shadow-lg hover:shadow-xl">
                Sign In
              </button>
            </NavLink>

            {/* Security Note */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Your data is protected with enterprise-grade security</span>
            </div>
          </div>
        </div>

        {/* Additional Links */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-gray-600">
            Need help? <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Contact IT Support</a>
          </p>
          <p className="text-sm text-gray-500">
            Don't have an account? <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Request Access</a>
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;