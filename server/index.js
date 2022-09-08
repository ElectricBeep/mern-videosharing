import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";

const app = express();
app.use(cors());

dotenv.config();
const connect = () => {
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Connected to MONGODB");
        })
        .catch((error) => {
            throw error;
        });
};

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

//For error handling
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";

    return res.status(status).json({
        success: false,
        status,
        message
    });
});

app.get("/", (req, res) => {
    res.send("APP IS RUNNING");
});

app.listen(process.env.PORT || 8800, () => {
    connect();
    console.log("Connected to Server");
});