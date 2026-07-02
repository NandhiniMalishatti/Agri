import React, { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Tractor, Menu, X, LogOut, User } from 'lucide-react';
import { useState } from 'react';

const MainLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'Farmer': return '/farmer-dashboard';
      case 'Tractor Owner':
      case 'Labourer': return '/provider-dashboard';
      case 'Admin': return '/admin-dashboard';
      default: return '/';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <Tractor className="h-8 w-8 text-agri" />
              <span className="ml-2 text-xl font-bold text-gray-900">AgriConnect</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {!user ? (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-agri font-medium transition-colors">Login</Link>
                  <Link to="/register" className="btn-primary">Register</Link>
                </>
              ) : (
                <>
                  <Link to={getDashboardLink()} className="text-gray-600 hover:text-agri font-medium transition-colors">Dashboard</Link>
                  <div className="flex items-center space-x-2 border-l pl-4 ml-4">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="font-medium text-gray-800">{user.name}</span>
                    <button onClick={handleLogout} className="ml-4 text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors" title="Logout">
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {!user ? (
                <>
                  <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-agri hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link to="/register" className="block px-3 py-2 text-base font-medium text-agri bg-agri-light hover:bg-agri-light/80 rounded-md" onClick={() => setIsMenuOpen(false)}>Register</Link>
                </>
              ) : (
                <>
                  <Link to={getDashboardLink()} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-agri hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  <div className="px-3 py-2 flex items-center justify-between border-t border-gray-100 mt-2 pt-2">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="font-medium text-gray-800">{user.name}</span>
                    </div>
                    <button onClick={handleLogout} className="flex items-center text-red-500 font-medium">
                      <LogOut className="h-5 w-5 mr-1" /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
