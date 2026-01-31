
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signOut } from '../firebase';

interface HeaderProps {
  isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blogs' },
    { name: 'Vacancy', path: '/vacancies' },
    { name: 'Result', path: '/results' },
    { name: 'Notice', path: '/notices' },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center group">
            <span className="text-red-500 mr-1 group-hover:scale-110 transition-transform duration-300">info</span>prasar
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="hover:text-blue-200 transition-all font-medium relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            {isAdmin ? (
              <>
                <Link to="/admin" className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition shadow-md">Admin Panel</Link>
                <button onClick={handleLogout} className="text-sm underline hover:text-red-300 ml-2">Logout</button>
              </>
            ) : (
              <Link to="/admin/login" className="text-sm text-blue-300 hover:text-white border border-blue-400/30 px-3 py-1 rounded">Admin</Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-6 relative flex flex-col justify-center items-center">
              <span className={`w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
              <span className={`w-6 h-0.5 bg-current transition-all duration-300 ease-in-out my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </div>

        {/* Animated Mobile Nav */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}
        >
          <div className="space-y-2 border-t border-blue-700/50 pt-2">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="block py-3 px-4 hover:bg-blue-700 rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isAdmin ? (
              <div className="flex flex-col space-y-2 mt-4">
                <Link 
                  to="/admin" 
                  className="block py-3 px-4 bg-red-600 rounded-lg font-bold text-center shadow-inner"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Panel
                </Link>
                <button 
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="block py-2 px-4 text-center text-red-300 underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/admin/login"
                className="block py-3 px-4 text-center text-blue-300 border border-blue-400/20 rounded-lg mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
