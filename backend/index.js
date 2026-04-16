import dotenv from "dotenv";
import  app from "./app.js";
import connectDB from "./db/db.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config({ path: "./.env" });

// HTTP server to wrap Express
const server = http.createServer(app);

// Initialize Socket.io with CORS_ORIGIN
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST"],
        credentials: true
    },
});

// Helper to track online users: { userId: socketId }
const userSocketMap = {}; 

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    // We will pass userId from frontend during connection
    const userId = socket.handshake.query.userId;
    
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    // Broadcast list of online users to everyone
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        if (userId) {
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});

connectDB()
    .then(() => {
        // IMPORTANT: We now use server.listen instead of app.listen
        server.listen(process.env.PORT || 3000, () => {
            console.log(`⚙️  Server running on http://localhost:${process.env.PORT || 3000}`);
        });
    })
    .catch((err) => {
        console.error("DB connection failed:", err);
        process.exit(1);
    });

export { io };