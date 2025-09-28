import express from 'express'
import { upload } from '../utils/multer.js';
import { uploadingFile } from '../controllers/upload.js';

const router = express.Router();

router.post('/upload',upload.single("file"),uploadingFile)

export default router