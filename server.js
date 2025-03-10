// const express = require("express");
// const bodyParser = require("body-parser");
// require("dotenv").config();
// const { TeamsBot } = require("./bot");
// const { adapter } = require("./teamsAdapter");

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());

// const bot = new TeamsBot();

// app.post("/api/messages", async (req, res) => {
//     console.log("Incoming request:", req.body);

//     if (!req.body) {
//         return res.status(400).send("Bad Request: No body received");
//     }

//     await adapter.processActivity(req, res, async (context) => {
//         await bot.run(context);
//     });
// });

// app.listen(PORT, () => {
//     console.log(`🚀 Bot is running on port ${PORT}`);
// });


require('dotenv').config();
const express = require("express");
const { BotFrameworkAdapter, TurnContext } = require("botbuilder");

const app = express();
const PORT = process.env.PORT || 10000; // Use Render's assigned port

// 🔹 Setup Microsoft Teams Bot Adapter
const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Middleware to parse JSON
app.use(express.json());

// 🔹 Fix Emulator Issue: Set Service URL Correctly
app.post("/api/messages", (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        if (context.activity.type === "message") {
            await context.sendActivity({
                text: `Hello! This bot is running on Render.`,
                serviceUrl: context.activity.serviceUrl || "https://teams-bot-v2ak.onrender.com/api/messages"
            });
        } else {
            await context.sendActivity(`[${context.activity.type} event detected]`);
        }
    });
});

// Root endpoint to check if bot is running
app.get("/", (req, res) => {
    res.send("Teams bot is live on Render!");
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
