import React from 'react';
import { Link } from 'react-router-dom';
import { Tractor, Users, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-agri-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left z-10 relative">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Book Tractors and</span>{' '}
              <span className="block text-agri xl:inline">Agricultural Labour</span>
              <span className="block xl:inline"> Anytime, Anywhere.</span>
            </h1>
            <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Helping farmers connect with nearby tractor owners and agricultural labourers quickly and efficiently. Boost your productivity with just a few clicks.
            </p>
            <div className="mt-8 sm:flex sm:justify-center lg:justify-start space-x-4">
              <Link to="/register" className="btn-primary text-lg px-8 py-3 flex items-center justify-center">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/login" className="btn-secondary text-lg px-8 py-3 flex items-center justify-center">
                Log In
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
            {/* Using a placeholder SVG pattern as illustration */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-xl">
              <div className="absolute -inset-4 bg-gradient-to-r from-agri to-agri-dark rounded-full opacity-20 blur-2xl animate-pulse"></div>
              <img 
                className="relative rounded-2xl shadow-xl w-full object-cover animate-fade-in-up" 
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Farmer in field with tractor" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-agri font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              How AgriConnect Works
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Feature 1 */}
              <div className="card text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-agri-light text-agri mx-auto mb-6">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Locate Services</h3>
                <p className="text-gray-600">Find available tractors and labourers in your specific village, mandal, and district.</p>
              </div>

              {/* Feature 2 */}
              <div className="card text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-agri-light text-agri mx-auto mb-6">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Book Instantly</h3>
                <p className="text-gray-600">Specify your work type, acres, and timing. Providers receive your request instantly.</p>
              </div>

              {/* Feature 3 */}
              <div className="card text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-agri-light text-agri mx-auto mb-6">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Connect Directly</h3>
                <p className="text-gray-600">Once accepted, get contact details immediately to coordinate the work seamlessly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-agri">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to simplify farming?</span>
            <span className="block text-agri-light text-2xl mt-2">Join thousands of farmers and providers today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4">
            <Link to="/register" className="bg-white text-agri px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-lg">
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Tractor className="h-8 w-8 text-agri" />
              <span className="ml-2 text-xl font-bold text-white">AgriConnect</span>
            </div>
            <div className="text-gray-400 text-sm">
              &copy; 2026 AgriConnect. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
