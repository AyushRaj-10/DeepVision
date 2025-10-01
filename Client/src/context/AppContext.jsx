import React, { createContext } from "react";
import axios from 'axios';

// Initialize the Context
const AppContext = createContext();

// Get the API base URL from Vite environment variables
// IMPORTANT: Ensure VITE_API_URL=http://localhost:3000 is in your Client/.env file
const url = import.meta.env.VITE_API_URL;

// The Provider component that wraps your application
export const AppProvider = ({ children }) => {

    // -----------------------------------------------------------
    // 1. IMAGE UPLOAD / ENHANCEMENT LOGIC
    // -----------------------------------------------------------
    const upload = async (file) => {
        if (!file) {
            throw new Error("No file selected for upload.");
        }

        const formData = new FormData();
        formData.append("file", file); // Must match Multer field name
        
        try {
            console.log("[UPLOAD] 🚀 Sending file to backend at:", `${url}/api/upload`);
            
            const res = await axios.post(`${url}/api/upload`, formData);

            console.log("[UPLOAD] ✅ Response received:", res.data);
            return res.data;

        } catch (error) {
            console.error("[UPLOAD] ❌ Upload failed:", error.response?.data || error.message);
            throw error; 
        }
    }
    
    // -----------------------------------------------------------
    // 2. PROFILE / ALERT SETUP LOGIC (POST - Saving Data)
    // -----------------------------------------------------------
    const saveProfile = async (profileData) => {
        try {
            console.log("[PROFILE] 🚀 Sending profile data to backend at:", `${url}/api/profile`);
            
            // Axios POST for JSON data
            const res = await axios.post(`${url}/api/profile`, profileData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            console.log("[PROFILE] ✅ Profile saved successfully:", res.data);
            return res.data;
            
        } catch (error) {
            console.error("[PROFILE] ❌ Save failed:", error.response?.data || error.message);
            throw error;
        }
    };
    
    // -----------------------------------------------------------
    // 3. PROFILE RETRIEVAL LOGIC (GET - Fetching Data for persistence)
    // -----------------------------------------------------------
    const fetchProfile = async () => {
        try {
            console.log("[PROFILE] 🚀 Fetching profile data from:", `${url}/api/profile`);
            const response = await axios.get(`${url}/api/profile`);
            
            // The backend is expected to return { success: true, profile: { ... } }
            return response.data.profile; 

        } catch (error) {
            console.error("[PROFILE] ❌ Fetch failed:", error.response?.data || error.message);
            throw error;
        }
    };


    // -----------------------------------------------------------
    // 4. CONTEXT VALUE EXPORT
    // -----------------------------------------------------------
    const contextValue = {
        upload,
        saveProfile,
        fetchProfile, // 🚨 Added the new function here
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;