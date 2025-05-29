import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Home, LogIn, UserPlus, LogOut, PackagePlus, List, Eye, GraduationCap } from 'lucide-react';
import { Store } from '../App';

const Navbar = () => {
  const { token, setToken } = useContext(Store);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    setToken(null);
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, icon: Icon, children, onClick, className = "" }) => {
    const active = isActive(to);
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`
          group flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium 
          transition-all duration-300 ease-in-out transform hover:scale-105
          ${active 
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-200' 
            : 'text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50'
          }
          ${className}
        `}
      >
        <Icon 
          size={18} 
          className={`transition-transform duration-300 ${active ? 'animate-pulse' : 'group-hover:rotate-12'}`} 
        />
        <span className="relative">
          {children}
          {active && (
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white rounded-full animate-pulse"></span>
          )}
        </span>
      </Link>
    );
  };

  const MobileNavLink = ({ to, icon: Icon, children, onClick }) => {
    const active = isActive(to);
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`
          group flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium
          transition-all duration-300 ease-in-out transform hover:translate-x-2
          ${active 
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
            : 'text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50'
          }
        `}
      >
        <Icon 
          size={20} 
          className={`transition-transform duration-300 ${active ? 'animate-bounce' : 'group-hover:scale-110'}`} 
        />
        <span>{children}</span>
        {active && (
          <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
        )}
      </Link>
    );
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-2">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200 group-hover:shadow-purple-300 transition-all duration-300 group-hover:scale-110">
                <GraduationCap className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-indigo-700 transition-all duration-300">
                BAS-Be a Seller
              </span>
              <span className="text-xs text-gray-500 font-medium -mt-1">Student Marketplace</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/" icon={Home}>
              Home
            </NavLink>

            {token && (
              <>
                <NavLink to="/sellproduct" icon={PackagePlus}>
                  Sell Product
                </NavLink>
                <NavLink to="/mylistings" icon={List}>
                  My Listings
                </NavLink>
                <NavLink to="/products" icon={Eye}>
                  Browse Products
                </NavLink>
                <NavLink to="/profile" icon={User}>
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="group flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-5 py-2 rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ml-2"
                >
                  <LogOut size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span>Logout</span>
                </button>
              </>
            )}

            {!token && (
              <>
                <NavLink to="/login" icon={LogIn}>
                  Login
                </NavLink>
                <Link
                  to="/register"
                  className="group flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-5 py-2 rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ml-2"
                >
                  <UserPlus size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="relative p-3 rounded-xl text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-110"
            >
              <div className="relative w-6 h-6">
                <Menu 
                  size={24} 
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                  }`} 
                />
                <X 
                  size={24} 
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Navigation Menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-3 bg-gradient-to-br from-gray-50 to-purple-50/30 border-t border-purple-100">
          <MobileNavLink to="/" icon={Home} onClick={closeMobileMenu}>
            Home
          </MobileNavLink>

          {token && (
            <>
              <MobileNavLink to="/sellproduct" icon={PackagePlus} onClick={closeMobileMenu}>
                Sell Product
              </MobileNavLink>
              <MobileNavLink to="/mylistings" icon={List} onClick={closeMobileMenu}>
                My Listings
              </MobileNavLink>
              <MobileNavLink to="/products" icon={Eye} onClick={closeMobileMenu}>
                Browse Products
              </MobileNavLink>
              <MobileNavLink to="/profile" icon={User} onClick={closeMobileMenu}>
                Profile
              </MobileNavLink>
              <button
                onClick={handleLogout}
                className="group flex items-center space-x-3 text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 w-full text-left px-4 py-3 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transform hover:translate-x-2 transition-all duration-300 mt-4"
              >
                <LogOut size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Logout</span>
              </button>
            </>
          )}

          {!token && (
            <>
              <MobileNavLink to="/login" icon={LogIn} onClick={closeMobileMenu}>
                Login
              </MobileNavLink>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="group flex items-center space-x-3 text-white bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 block px-4 py-3 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transform hover:translate-x-2 transition-all duration-300 mt-4"
              >
                <UserPlus size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;