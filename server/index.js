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
const Note = require("./models/note.model");

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
            message: "User already exists!",
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
        message: "Registration Successful",
    })
});

app.post("/login", async(req, res) => {
    const {email, password} = req.body;

    if(!email){
        return res.status(400).json({message: "Email is required"});
    }

    if(!password){
        return res.status(400)({message: "Password is required"})
    }

    const userInfo = await User.findOne({email: email});
    
    if(!userInfo){
        return res.status(400).json({message: "User not found"});
    }

    if(userInfo.email == email && userInfo.password == password){
        const user = {user: userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: "3600m",
        });

        return res.json({
            error: false,
            message: "Login Successful!",
            email,
            accessToken,
        });  
    }

    else{
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials"
        });
    }
});

app.post("/add-note", authenticateToken, async(req,res) => {
    const {title, content, tags} = req.body;
    const {user} = req.user;

    if(!title){
        return res.status(400).json({error: true, message: "Title is required"});
    }

    if(!content){
        return res.status(400).json({error: true, message: "Content is required"});
    }

    try{
        const note = new Note({
            title,
            content, 
            tags: tags || [],
            userId: user._id,
        })

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successfully"
        })
    }catch(error){
        return res.status(500).json({
            error: true,
            message: "Internal server error",
        });
    }
    
})

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

module.exports = app;
