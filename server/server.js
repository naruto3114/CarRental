import express from 'express';
import "dotenv/config";
import cors from "cors";
import ImageKit from "imagekit"; // 1. Import ImageKit
import connectDB from './configs/db.js';
import userRouters from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

const app = express()

await connectDB()

// 2. Initialize ImageKit
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

app.use(cors())
app.use(express.json())

app.get('/', (req ,res)=> res.send("Server is running"))

// 3. ImageKit Auth Endpoint (For Frontend Uploads)
app.get('/api/imagekit-auth', (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
});

const authenticator = async () => {
    try {
        // Replace with your actual Render backend URL
        const response = await fetch(`https://carrental-n3kt.onrender.com/api/imagekit-auth`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

app.use('/api/user', userRouters)
app.use('/api/owner', ownerRouter)
app.use('/api/bookings', bookingRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
