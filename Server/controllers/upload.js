import cloudinary from "../utils/cloudinary.js";
import { sendAlertEmail } from '../utils/emailService.js';
import OperatorProfile from '../models/OperatorProfileModel.js';

const simulateAIPipeline = (imageBuffer, mimeType) => {
  const threats = [
    { type: 'Mine', confidence: 0.95 },
    { type: 'Submarine', confidence: 0.82 }
  ];
  const enhancedBuffer = imageBuffer; 
  return {
    enhancedBuffer: enhancedBuffer,
    metrics: { 
      psnr: 35.1, 
      ssim: 0.95, 
      uiqm: 5.2, 
      latency_ms: 100 
    },
    threat_detections: threats,
    is_alert: true,
  };
};

export const uploadingFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    
    const rawBuffer = req.file.buffer;
    const mimeType = req.file.mimetype;

    const aiResult = simulateAIPipeline(rawBuffer, mimeType); 
    
    const rawDataUri = `data:${mimeType};base64,${rawBuffer.toString('base64')}`;
    const rawUpload = await cloudinary.uploader.upload(rawDataUri, {
      resource_type: "auto",
      folder: "DeepVision/raw_input" 
    });
    
    const enhancedBuffer = aiResult.enhancedBuffer; 
    const enhancedDataUri = `data:${mimeType};base64,${enhancedBuffer.toString('base64')}`; 
    const enhancedUpload = await cloudinary.uploader.upload(enhancedDataUri, {
      resource_type: "auto",
      folder: "DeepVision/ai_enhanced" 
    });

    if (aiResult.is_alert) {
      const operator = await OperatorProfile.findOne().sort({ lastUpdated: -1 });
      if (operator && operator.email) {
        await sendAlertEmail(operator.email, {
          threat_detections: aiResult.threat_detections,
          operatorName: operator.name 
        });
      } else {
        console.warn("[ALERT] No operator profile found. Alert not sent via email. Please check /profile route setup.");
      }
    }
    
    return res.status(200).json({
      success: true,
      message: "Images processed and analysis complete.",
      raw_url: rawUpload.secure_url,
      enhanced_url: enhancedUpload.secure_url, 
      metrics: aiResult.metrics,
      threat_detections: aiResult.threat_detections,
      is_alert: aiResult.is_alert,
    });

  } catch (error) {
    console.error("Processing and upload failed:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server failed during image processing or storage.", 
      error: error.message 
    });
  }
};
