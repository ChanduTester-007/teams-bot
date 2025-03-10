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
const PORT = process.env.PORT || 3000; // Render assigns a port dynamically

// Create an adapter to handle requests from Teams
const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Middleware to handle JSON requests
app.use(express.json());

// Handle incoming messages from Teams
app.post("/api/messages", (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        if (context.activity.type === "message") {
            await context.sendActivity(`Hello! This bot is deployed on Render.`);
        }
    });
});

// Root endpoint to check if the bot is running
app.get("/", (req, res) => {
    res.send("Teams bot is running on Render!");
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
