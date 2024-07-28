import { v2 as cloudinary } from 'cloudinary';

export async function POST(req, res) {
    try {
      
        const body = await req.json();

        if (!body || !body.paramsToSign) {
            return res.status(400).json({ error: 'Invalid request body' });
        }
        const signature = cloudinary.utils.api_sign_request(body.paramsToSign, process.env.CLOUDINARY_API_SECRET);

        return res.status(200).json({ signature });

    } catch (error) {
           console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
