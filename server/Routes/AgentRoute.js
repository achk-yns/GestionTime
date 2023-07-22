const express = require('express');
const route = express.Router();
const Agent = require("../Models/Agent");

// Sign up function
route.post('/signup', async (req, res) => {
    try {
        // Extract the necessary data from the request body
        const { name, code, isAdmin } = req.body;

        // Check if the Agent already exists in the database (optional)
        const existingAgent = await Agent.findOne({ code });
        if (existingAgent) {
            return res.status(409).json({ error: "Agent with the provided code already exists" });
        }

        // Create a new Agent object
        const newAgent = new Agent({
            name,
            code,
            isAdmin,
        });

        // Save the new Agent in the database
        const savedAgent = await newAgent.save();

        // Respond with a success message and the saved Agent object
        return res.status(201).json({ message: "Agent signed up successfully", agent: savedAgent });
    } catch (err) {
        // If an error occurs during the sign-up process, handle it here
        console.error("Error during sign up:", err);
        return res.status(500).json({ error: "An internal server error occurred" });
    }
});

route.post('/login',async (req,res)=>{
    const {name,code,isAdmin} = req.body
    const existingAgent = await Agent.findOne({ code });
    if (!existingAgent) {
        return res.status(409).json({ error: "Agent Not found" });
    }
    return res.status(201).json({message:'agent Connected',data:existingAgent})
})

module.exports = route;
