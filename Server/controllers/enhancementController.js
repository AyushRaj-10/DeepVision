import axios from 'axios';
import FormData from 'form-data';

// 1. Set the public URL of your deployed Python AI service.
const PUBLIC_AI_URL = 'https://underwater-enhancer-service-997612821032.asia-south1.run.app';
const AI_API_URL = `${PUBLIC_AI_URL}/upload`;
const PYTHON_SERVER_VIEW_URL = `${PUBLIC_AI_URL}/view`;

/**
 * Forwards an image to the public Python AI service for enhancement.
 */
export const enhanceImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No image file uploaded.' });
    }

    const form = new FormData();
    // The key 'file' must match the one in your Python app: request.files['file']
    form.append('file', req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
    });

    try {
        console.log(`[Node Backend] Forwarding image to PUBLIC AI service at: ${AI_API_URL}`);

        // 2. Post the image form data to the public AI server.
        const response = await axios.post(AI_API_URL, form, {
            headers: {
                ...form.getHeaders(),
            },
            timeout: 90000, // Set a longer timeout (90 seconds) for the AI model to process
        });

        // 3. Check for a successful response from the AI service.
        if (response.data && response.data.success) {
            console.log('[Node Backend] AI processing successful:', response.data);

            // 4. Construct the full URL to view the enhanced image.
            const enhancedImageUrl = `${PYTHON_SERVER_VIEW_URL}/${response.data.output_file}`;
            
            // 5. Send the final URL back to the frontend.
            return res.status(200).json({
                message: 'Enhancement successful.',
                enhancedImageUrl: enhancedImageUrl,
            });
        } else {
            // Handle cases where the Python server returns a structured error.
            console.error('[Node Backend] AI service returned a failure response:', response.data.error);
            return res.status(500).json({ message: response.data.error || 'An unknown error occurred in the AI service.' });
        }
    } catch (error) {
        // This block will catch network errors and 4xx/5xx responses from the AI service.
        if (error.response) {
            console.error('[Node Backend] Error from AI service:', error.response.data);
            console.error('[Node Backend] Status code:', error.response.status);
            return res.status(500).json({ 
                message: 'The AI enhancement service failed to process the request.',
                error: error.response.data 
            });
        } else if (error.request) {
            console.error('[Node Backend] No response received from AI service. It might be down or taking too long.', error.request);
            return res.status(504).json({ message: 'No response from AI service (Gateway Timeout).' });
        } else {
            console.error('[Node Backend] Error setting up the request to AI service:', error.message);
            return res.status(500).json({ message: 'Failed to create the request to the AI service.' });
        }
    }
};

