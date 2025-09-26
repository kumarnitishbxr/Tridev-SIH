
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import HomepageNavbar from '../Components/HomepageNavbar';

import imag1 from '../assets/Kochi-Metro_600-1.jpg'
import imag2 from '../assets/kmrl.jpg'
import { 
  Building2, 
  ArrowRight,
  Play,
  Users,
  Star,
  Globe,
  Shield,
  Zap,
  BarChart3,
  Settings,
  ArrowDown,
  MapPin,
  Phone,
} from 'lucide-react';
import AdminDashboard from './AdminDashboard';

const DynamicHomepage = () => {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Organization photos/slides
  const slides = [
    {
      image: imag1,
      title: 'Modern Engineering Excellence',
      subtitle: 'State-of-the-art facilities driving innovation',
      alt: 'Modern office building with glass facade'
    },
    {
      image: imag2,
      title: 'Collaborative Workspaces',
      subtitle: 'Where great minds come together to create',
      alt: 'Modern office interior with collaborative spaces'
    },
    {
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Innovation at Every Level',
      subtitle: 'Advanced technology meets creative solutions',
      alt: 'High-tech engineering workspace'
    }
  ];

  // Team testimonials
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Engineer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b812c6d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      quote: 'DashBoard Pro has revolutionized how we manage our engineering projects. The efficiency gains are remarkable.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Project Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      quote: 'The collaborative features have transformed our team productivity. We deliver projects 40% faster now.'
    },
    {
      name: 'Emily Johnson',
      role: 'Department Head',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      quote: 'Outstanding platform with incredible support. Our organization efficiency has never been better.'
    }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-gray-50">
     
     <HomepageNavbar/>


      {/* Hero Section with Dynamic Carousel */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
          ))}
        </div>


        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-4xl">
              <div className="animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Engineering
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent block">
                    Excellence
                  </span>
                  <span className="text-4xl md:text-5xl block mt-2">Starts Here</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
                  {slides[currentSlide].subtitle}. Transform your engineering workflows with our cutting-edge platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <NavLink to='/admin'>
                    <button className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group">
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  </NavLink>
                  <button
                  onClick={() =>
                      window.open(
                        "https://drive.google.com/file/d/1SR5gJqQlY0GjABhLegSzUJpAuuStkVAI/view?usp=drivesdk",
                        "_blank"
                      )
                    }
                  
                  className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group">
                    <Play className="w-5 h-5" />
                    <span>Watch Demo Video</span>
                  </button>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 max-w-2xl">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">10k+</div>
                    <div className="text-gray-300 text-sm">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
                    <div className="text-gray-300 text-sm">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">99</div>
                    <div className="text-gray-300 text-sm">Companies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 right-8 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SuchanaSetu?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed for modern engineering teams to collaborate, innovate, and deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Optimized performance for complex engineering workflows',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Bank-level security with end-to-end encryption',
                color: 'from-green-500 to-teal-500'
              },
              {
                icon: Users,
                title: 'Team Collaboration',
                description: 'Real-time collaboration tools for distributed teams',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: BarChart3,
                title: 'Advanced Analytics',
                description: 'Comprehensive insights into project performance',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: Settings,
                title: 'Customizable',
                description: 'Tailor the platform to your specific needs',
                color: 'from-gray-600 to-gray-800'
              },
              {
                icon: Globe,
                title: 'Global Scale',
                description: 'Built to scale from startups to enterprises',
                color: 'from-indigo-500 to-purple-500'
              }
            ].map((feature, index) => (
              <div key={index} className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Engineering Leaders</span>
            </h2>
            <p className="text-xl text-gray-600">
              See what industry professionals say about our platform
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-24 h-24 rounded-full object-cover shadow-lg"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 italic">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-purple-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Engineering Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of engineering professionals who trust SuchanaSetu for their project management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink to='/staff'>
              <button className="flex items-center justify-center space-x-3 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group">
              <span>Start</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            </NavLink>
            {/* <button className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Phone className="w-5 h-5" />
              <span>Schedule Demo</span>
            </button> */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-2 rounded-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">SuchanaSetu</h3>
                  <p className="text-gray-400 text-sm">Engineering Excellence</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Empowering engineering teams worldwide with cutting-edge project management and collaboration tools.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Product</h4>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'Security', 'Integrations'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {['Help Center', 'Documentation', 'Contact Us', 'Status'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 DashBoard Pro. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                  <a key={item} href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DynamicHomepage;
