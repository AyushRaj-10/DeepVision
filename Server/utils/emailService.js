import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, 
    secure: true,
    auth: {
        user: process.env.EMAIL_SERVICE_USER,
        pass: process.env.EMAIL_SERVICE_PASS,
    },
});

export const sendAlertEmail = async (recipientEmail, detectionData) => {
    const threats = detectionData.threat_detections || [];
    const operatorName = detectionData.operatorName || 'Operator';
    const threatListHtml = threats
        .map(t => 
            `<li>🔴 <b>${t.type}</b> detected (Confidence: ${Math.round(t.confidence * 100)}%)</li>`
        )
        .join('');
    const mailOptions = {
        from: `DeepVision Sentinel <${process.env.EMAIL_SERVICE_USER}>`,
        to: recipientEmail, 
        subject: `🚨 CRITICAL ALERT: Underwater Threat Detected (${threats.length} items)`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8f8f8; border: 1px solid #cc0000; border-radius: 8px;">
                <h2 style="color: #cc0000; margin-bottom: 15px;">IMMEDIATE ACTION REQUIRED</h2>
                <p>Dear ${operatorName},</p>
                <p>The DeepVision AI system has flagged a critical security event:</p>
                <h3 style="color: #0077b6; margin-top: 20px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Detection Summary:</h3>
                <ul style="list-style: disc; padding-left: 25px; font-size: 1.0em;">
                    ${threatListHtml.length > 0 ? threatListHtml : '<li>No specific items listed. Please check system logs.</li>'}
                </ul>
                <p style="margin-top: 25px;">
                    <b>Recommended Action:</b> Please log into the Sentinel View Dashboard immediately for live coordinates and visual confirmation.
                </p>
                <p style="font-size: 0.8em; color: #777; margin-top: 30px;">
                    This is an automated system alert.
                </p>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`[ALERT] ✅ Critical Alert email sent to: ${recipientEmail}. Message ID: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error("=================================================");
        console.error(`[ALERT] ❌ FAILED to send email to ${recipientEmail}.`);
        console.error(`ERROR MESSAGE: ${error.message}`);
        console.error(`NODEMAILER ERROR CODE: ${error.code || 'N/A'}`);
        console.error("=================================================");
        return false;
    }
};

const runTest = async () => {
    console.log("Running email sending test...");
    const testRecipient = 'recipient-email@example.com'; 
    const sampleDetectionData = {
        operatorName: 'Jane Doe',
        threat_detections: [
            { type: 'Unidentified Submersible', confidence: 0.94 },
            { type: 'Fast-Moving Object', confidence: 0.88 },
        ]
    };
    if (!process.env.EMAIL_SERVICE_USER || !process.env.EMAIL_SERVICE_PASS) {
        console.error("❌ ERROR: EMAIL_SERVICE_USER or EMAIL_SERVICE_PASS not found in .env file.");
        console.error("Please ensure you have a correctly configured .env file in your project root.");
        return;
    }
    await sendAlertEmail(testRecipient, sampleDetectionData);
};

if (import.meta.url.startsWith('file:') && process.argv[1] === new URL(import.meta.url).pathname) {
    runTest();
}
