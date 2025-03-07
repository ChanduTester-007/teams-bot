require("dotenv").config();
const express = require("express");
const adapter = require("./teamsAdapter");
const TeamsBot = require("./bot");

const app = express();
const port = process.env.PORT || 10000;  // Render assigns a dynamic port

// Keep Render server alive
app.get("/", (req, res) => {
    res.send("Microsoft Teams Bot is Running!");
});

// Initialize the bot
const bot = new TeamsBot();

// Handle incoming Teams messages
app.post("/api/messages", async (req, res) => {
    await adapter.process(req, res, async (context) => {
        await bot.run(context);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Bot is running on port ${port}`);
});
