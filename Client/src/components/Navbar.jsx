import React from 'react';
// 🚨 New: Import Link for client-side routing
import { Link } from 'react-router-dom'; 

const Navbar = () => {
    // 🚨 IMPORTANT: Replace the static href="#" with the correct Link and 'to' paths
    
    return (
        <div className='sticky top-0 z-50 h-20 w-full flex justify-between items-center px-4 md:px-8 bg-slate-900/95 backdrop-blur-md border-b border-teal-500/20'>
            <div className="flex items-center gap-3">
                {/* Use Link for the logo to navigate Home */}
                <Link to="/" className="flex items-center gap-3">
                    {/* Assuming DeepVision.jpg is accessible in the public folder */}
                    <img src="./DeepVision.jpg" className="h-12 w-12 rounded shadow-lg shadow-teal-500/30" alt="DeepVision Logo" />
                    <h1 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">DeepVision</h1>
                </Link>
            </div>
            
            <div className='hidden md:flex items-center gap-8'>
                
                {/* Home */}
                <NavLink to="/" label="Home" />
                
                {/* Profile / Alert Setup (CRITICAL NEW LINK) */}
                <NavLink to="/profile" label="Alert Setup" highlight={true} /> 

                {/* Dashboard (Assuming Dashboard is the main Home analysis page) */}
                <NavLink to="/dashboard" label="Historical Data" /> 
                
                {/* Example of a more utility link */}
                <NavLink to="/logs" label="System Logs" /> 
            </div>

            {/* User/Settings Icon or Mobile Menu (optional mobile menu button retained) */}
            <div className='md:hidden'>
                <button className="text-gray-300 p-2 rounded hover:bg-slate-800">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

// 🚨 Reusable component for the navigation links
const NavLink = ({ to, label, highlight = false }) => (
    <Link 
        to={to} 
        className={`text-gray-300 hover:text-teal-400 transition-colors duration-300 relative group 
                    ${highlight ? 'text-red-400 hover:text-red-500 font-bold' : ''}`}
    >
        {label}
        {/* Underline effect */}
        <div className={`absolute bottom-0 left-0 w-0 h-0.5 ${highlight ? 'bg-red-500' : 'bg-teal-400'} group-hover:w-full transition-all duration-300`}></div>
    </Link>
);


export default Navbar;