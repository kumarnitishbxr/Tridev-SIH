import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; // ✅ FIXED

import { 
  Building2, 
  Menu, 
  X,
  LogIn,
  UserPlus,
  Sparkles
} from "lucide-react";

const HomepageNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo Section */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-2.5 rounded-xl shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse">
                <Sparkles className="w-2 h-2 text-white m-0.5" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1
                className={`text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent ${
                  isScrolled ? "" : "text-black"
                }`}
              >
                SuchanaSetu
              </h1>
              <p
                className={`text-sm font-medium ${
                  isScrolled ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Engineering Excellence
              </p>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    : "text-white hover:text-gray-200 hover:bg-white/10 backdrop-blur-sm"
                } ${isActive ? "bg-gray-200 font-semibold" : ""}`
              }
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10 backdrop-blur-sm"
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>


        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Logo */}
              <div className="flex items-center justify-center space-x-3 pb-4 border-b border-gray-200">
                <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-2 rounded-lg">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">DashBoard Pro</h2>
                  <p className="text-xs text-gray-600">Engineering Excellence</p>
                </div>
              </div>


              {/* Mobile Auth Buttons */}
              <div className="space-y-3">
                <NavLink
                  to="/login"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </NavLink>

                <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700">
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </div>


              {/* Optional: Additional Info */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600">
                  Join thousands of engineering professionals
                </p>
                <div className="flex justify-center space-x-4 mt-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">10k+</p>
                    <p className="text-xs text-gray-500">Users</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-purple-600">99.9%</p>
                    <p className="text-xs text-gray-500">Uptime</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-pink-600">24/7</p>
                    <p className="text-xs text-gray-500">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>


      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10"></div>
      </div>


      {/* Animated Particles (Optional) */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-1/2 right-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-25"></div>
      </div>
    </nav>
  );
};

export default HomepageNavbar;
