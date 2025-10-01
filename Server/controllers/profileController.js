import OperatorProfile from '../models/OperatorProfileModel.js';

export const saveProfile = async (req, res) => {
    const { name, designation, email, organization } = req.body;

    if (!name || !email || !designation) {
        return res.status(400).json({ success: false, message: "Missing required profile fields." });
    }
    
    try {
        let profile = await OperatorProfile.findOneAndUpdate(
            { email: email }, 
            { name, designation, organization, lastUpdated: Date.now() }, 
            { new: true, upsert: true, runValidators: true } 
        );
        
        return res.status(200).json({ success: true, message: "Profile successfully saved and alerts activated.", profile });

    } catch (error) {
        console.error("MongoDB Save Error:", error);
        if (error.code === 11000) return res.status(400).json({ success: false, message: "Profile with this email already exists." });
        return res.status(500).json({ success: false, message: "Server failed to save profile." });
    }
};

export const getProfile = async (req, res) => {
    try {
        const profile = await OperatorProfile.findOne().sort({ lastUpdated: -1 });

        if (!profile) {
            return res.status(200).json({ success: true, profile: {} }); 
        }
        
        return res.status(200).json({ success: true, profile });

    } catch (error) {
        console.error("MongoDB Fetch Error:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch profile data." });
    }
};
