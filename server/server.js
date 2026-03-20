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

app.use('/api/user', userRouters)
app.use('/api/owner', ownerRouter)
app.use('/api/bookings', bookingRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
