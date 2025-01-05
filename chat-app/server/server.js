const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join room", (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
    });

    socket.on("send_message", (data) => {
        io.to(data.room).emit("recieve_message", data);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUndefiedTopology: true,
}).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log(err);
});