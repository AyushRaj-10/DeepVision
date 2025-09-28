import cloudinary from "../utils/cloudinary.js";

export const uploadingFile = async (req, res) => {
  try {
    console.log(req.file)
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }


    const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      resource_type: "auto",
      folder: "DeepVision"
    });

    return res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    });

  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ success: false, message: "Upload failed", error: error.message });
  }
};
