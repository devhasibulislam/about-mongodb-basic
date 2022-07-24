const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const userSchema = require("../schemas/user");
const User = new mongoose.model("User", userSchema);

// SIGNUP
router.post("/signup", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
            status: req.body.status
        });

        await newUser.save();
        res.status(200).json({ success: "signup successful." })
    } catch (error) {
        // res.status(500).json({ error: "signup unsuccessful." })
        res.status(500).json({ error: error.message })
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username });

        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

            if (isValidPassword) {
                // generate token
                const token = jwt.sign(
                    {
                        userID: user[0]._id,
                        username: user[0].username
                    },
                    process.env.PRIVATE_KEY,
                    {
                        expiresIn: "1h"
                    }
                );

                res.status(200).json({
                    token: token,
                    message: "authorization successful."
                })
            } else {
                res.status(401).json({ error: "unauthorized credentials" })
            }
        }
    } catch (error) {
        res.status(401).json({ error: "unauthorized credentials" })
    }
})

// GET ALL USERS
router.get("/all", async (req, res) => {
    try {
        const users = await User.find({
            status: "active"
        })
        // .populate("todos");
        // .populate("todos", "title status");
        .populate("todos", "title status -_id");

        res.status(200).send(users);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router;
