require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

// ✅ Simplified MongoDB connection
mongoose.connect(config.connectionString)
    .then(() => {
        console.log("✅ MongoDB connected successfully");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

module.exports = app;
