import dotenv from 'dotenv';
import enhancementRouter from './routes/enhancement.js';
dotenv.config();

console.log("==============================================");
console.log("DEBUG CHECK: ENVIRONMENT VARIABLES");
console.log("DEBUG: EMAIL_SERVICE_USER is loaded:", process.env.EMAIL_SERVICE_USER);
console.log("DEBUG: EMAIL_SERVICE_PASS is loaded:", 
    process.env.EMAIL_SERVICE_PASS ? 'YES (Hidden for Security)' : '❌ NO/UNDEFINED');
console.log("==============================================");

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { dbConnection } from './database/dbConnection.js';

import uploadRouter from './routes/upload.js';
import profileRouter from './routes/profile.js';

const CLIENT_ORIGIN = process.env.CLIENT_URL || 'http://localhost:5173';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: CLIENT_ORIGIN, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,
}));

dbConnection();

app.use('/api/upload', uploadRouter);   
app.use('/api/profile', profileRouter);
app.use("/api/enhance", enhancementRouter);  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
