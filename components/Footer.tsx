
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b0e14] relative text-gray-400 py-16 mt-auto overflow-hidden">
      {/* Decorative top border with gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-red-500 opacity-80"></div>
      
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/5 blur-[100px] rounded-full -ml-32 -mb-32"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-white text-3xl font-extrabold mb-6 tracking-tighter">
              <span className="text-red-500">info</span>prasar
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-gray-400 max-w-md">
              Nepal's most trusted digital information hub. We bring you the latest vacancies, results, and critical updates directly from official sources.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all duration-300">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 transition-all duration-300">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-widest border-l-2 border-red-500 pl-3">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors flex items-center"><span>About Company</span></Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors flex items-center"><span>Contact Support</span></Link></li>
              <li><Link to="/privacy" className="hover:text-blue-400 transition-colors flex items-center"><span>Privacy Policy</span></Link></li>
              <li><Link to="/terms" className="hover:text-blue-400 transition-colors flex items-center"><span>Terms of Service</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-widest border-l-2 border-blue-500 pl-3">Categories</h3>
            <ul className="space-y-3">
              <li><Link to="/vacancies" className="hover:text-blue-400 transition-colors">Job Vacancies</Link></li>
              <li><Link to="/results" className="hover:text-blue-400 transition-colors">Latest Results</Link></li>
              <li><Link to="/notices" className="hover:text-blue-400 transition-colors">Government Notices</Link></li>
              <li><Link to="/blogs" className="hover:text-blue-400 transition-colors">Educational Blog</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} infoprasar. Built for the citizens of Nepal.</p>
          <p className="flex items-center">
            Made with <span className="text-red-500 mx-1">❤</span> in Kathmandu
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
