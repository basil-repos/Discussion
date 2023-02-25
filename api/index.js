import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Routes
import authRoutes from './routes/auth.js';
import teamRoutes from './routes/team.js'

const app = express();

dotenv.config();

app.use(cors({ origin: true, credentials: true }));

mongoose.set('strictQuery', false);

const dbconnect = () => {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log('Connected to Database');
    }).catch(error => {
        throw error;
    });
}

// Cookie
app.use(cookieParser());

// Routes
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/teams", teamRoutes);

// Error
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";

    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(process.env.PORT || 8800, () => {
    dbconnect();
    console.log('Connected to Server');
})