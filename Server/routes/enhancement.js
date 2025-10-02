// File: Server/routes/enhancement.js
import express from 'express';
import { enhanceImage } from '../controllers/enhancementController.js';
import { upload } from '../utils/multer.js'; // We'll reuse your existing multer setup

const router = express.Router();

// Define the enhancement route
// 'image' must match the field name in the frontend FormData
router.post('/', upload.single('image'), enhanceImage);

export default router;