import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify'; // Assume toast is imported globally or here
import Navbar from '../components/Navbar';
import AppContext from '../context/AppContext';

const Profile = () => {
    // 🚨 Destructure the required functions
    const { saveProfile, fetchProfile } = useContext(AppContext); 
    
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        email: '',
        organization: 'DRDO / Indian Navy', // Default value
    });
    
    const [isLoading, setIsLoading] = useState(false); // Used for saving
    const [isInitialLoading, setIsInitialLoading] = useState(true); // Used for fetching

    // ------------------------------------------------
    // 1. Data Retrieval (Persistence Logic)
    // ------------------------------------------------
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchProfile();
                
                // If profile data exists (not an empty object from backend)
                if (data && data.email) { 
                    setFormData({
                        name: data.name || '',
                        designation: data.designation || '',
                        email: data.email || '',
                        organization: data.organization || 'DRDO / Indian Navy',
                    });
                    toast.info("Existing operator profile loaded.", { autoClose: 2000 });
                } else {
                    toast.warn("No saved profile found. Please enter details.", { autoClose: 3000 });
                }
            } catch (error) {
                console.error("Error loading profile:", error);
                toast.error("Failed to fetch profile data from server.");
            } finally {
                setIsInitialLoading(false);
            }
        };

        loadProfile();
    }, [fetchProfile]); // Runs once on mount

    // ------------------------------------------------
    // 2. Form Handling
    // ------------------------------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        setIsLoading(true);
        toast.info("Saving profile for alert configuration...");

        try {
            await saveProfile(formData); 
            toast.success("Profile saved! Alerts will be sent to your email.");
            // 🚨 Update lastUpdated field in MongoDB (handled by the controller logic)
        } catch (error) {
            console.error("Profile save failed:", error);
            toast.error("Failed to save profile. Please check console.");
        } finally {
            setIsLoading(false);
        }
    };
    
    if (isInitialLoading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-slate-900 text-white p-8 flex items-center justify-center">
                    <svg className="animate-spin h-8 w-8 text-teal-400 mr-3" viewBox="0 0 24 24">
                        {/* Spinner SVG */}
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-xl text-teal-400">Loading operator profile...</span>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-900 text-white p-8">
                <div className="container mx-auto max-w-2xl bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-teal-600/30 shadow-2xl shadow-teal-500/20">
                    <h2 className="text-3xl font-bold mb-6 text-teal-400 border-b border-teal-600/50 pb-2">
                        Operator Profile & Alert Setup
                    </h2>
                    <p className="text-gray-400 mb-6">
                        Enter your details to configure automated security alerts for unusual detections.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-white"
                                placeholder="Cdr. A. Sharma"
                            />
                        </div>

                        {/* Designation */}
                        <div>
                            <label htmlFor="designation" className="block text-sm font-medium text-gray-300 mb-1">Designation / Rank</label>
                            <input
                                type="text"
                                id="designation"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-white"
                                placeholder="Mission Specialist"
                            />
                        </div>

                        {/* Email (Crucial Alert Field) */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-red-300 mb-1">Alert Email Address (Mandatory)</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-slate-700 border border-red-500/50 rounded-lg focus:ring-red-500 focus:border-red-500 text-white"
                                placeholder="commander.sharma@mod.gov.in"
                            />
                            <p className="text-xs text-gray-500 mt-1">Alerts for threats (Mines, Submarines) will be sent here.</p>
                        </div>
                        
                        {/* Organization (Read-only for context) */}
                        <div>
                            <label htmlFor="organization" className="block text-sm font-medium text-gray-300 mb-1">Organization</label>
                            <input
                                type="text"
                                id="organization"
                                name="organization"
                                value={formData.organization}
                                readOnly
                                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-gray-400 cursor-not-allowed"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full px-4 py-3 rounded-lg text-lg font-bold transition-all duration-300 shadow-lg ${
                                isLoading 
                                    ? 'bg-gray-600 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 hover:scale-[1.01] shadow-teal-500/30'
                            }`}
                        >
                            {isLoading ? 'Saving...' : '💾 Save Profile & Activate Alerts'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Profile;