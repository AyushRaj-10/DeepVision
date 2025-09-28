import React from 'react';

const Navbar = () => {
  return (
    <div className='h-20 w-full flex justify-between items-center px-4 md:px-8 bg-slate-900/95 backdrop-blur-md border-b border-teal-500/20'>
      <div className="flex items-center gap-3">
        <img src="./DeepVision.jpg" className="h-12 w-12 rounded shadow-lg shadow-teal-500/30" alt="DeepVision Logo" />
        <h1 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">DeepVision</h1>
      </div>
      
      <div className='hidden md:flex items-center gap-8'>
        <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 relative group">
          Home
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300"></div>
        </a>
        <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 relative group">
          About
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300"></div>
        </a>
        <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 relative group">
          Dashboard
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300"></div>
        </a>
        <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 relative group">
          Contact
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300"></div>
        </a>
      </div>

      <div className='md:hidden'>
        <button className="text-gray-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;