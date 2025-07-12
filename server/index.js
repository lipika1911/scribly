require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

const jwt = require("jsonwebtoken");
const {authenticateToken} = require('./utilities');


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected successfully");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });

const User = require("./models/user.model");

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

app.post("/create-account", async(req, res) => {
    const { fullName, email, password } = req.body;

    if(!fullName){
        return res
            .status(400)
            .json({error: true, message: 'Full Name is required'})
    }

    if(!email){
        return res.status(400).json({error: true, message: "Email is required"});
    }

    if(!password){
        return res
            .status(400)
            .json({error: true, message: "Password is required"}); 
    }

    const isUser = await User.findOne({email: email});

    if(isUser){
        return res.json({
            error: true,
            message: "user already exists!",
        })
    }

    const user = new User({
        fullName, 
        email, 
        password,
    });

    await user.save();

    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: "3600m"
    })

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Succesful",
    })
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

module.exports = app;
