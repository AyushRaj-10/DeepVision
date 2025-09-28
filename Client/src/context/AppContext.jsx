import React, { createContext } from "react";
import axios from 'axios';

export const AppContext = createContext();

const url = import.meta.env.VITE_API_URL;

export const AppProvider = ({ children }) => {

    const upload = async (file) => {

        if (!file) {
            console.error("[UPLOAD] ❌ No file provided!");
            return;
        }

        console.log("[UPLOAD] 📄 File selected:", file);
        console.log("[UPLOAD] 📝 Name:", file.name, "Type:", file.type, "Size:", file.size);

        const formData = new FormData();
        formData.append("file", file);
        console.log("[UPLOAD] 🏗 FormData prepared:", formData);

        try {
            console.log("[UPLOAD] 🚀 Sending file to backend at:", `${url}/api/upload`);
            const res = await axios.post(`${url}/api/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log("[UPLOAD] ✅ Response received from backend:", res.data);
            return res.data;

        } catch (error) {
            console.error("[UPLOAD] ❌ Upload failed:", error.response?.data || error.message);
            throw error;
        }
    }

    return (
        <AppContext.Provider value={{ upload }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;
