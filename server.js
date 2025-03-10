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


const express = require('express');
const { BotFrameworkAdapter } = require('botbuilder');

const app = express();
app.use(express.json());

// Check if running on Render (Disable Local)
if (!process.env.RENDER) {
    console.error("⚠️ This bot only runs on Render. Exiting...");
    process.exit(1);
}

// Bot Adapter
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Bot Logic: Reply to Messages
const botLogic = async (context) => {
    if (context.activity.type === 'message') {
        await context.sendActivity(`You said: ${context.activity.text}`);
    }
};

// Teams Bot Route
app.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await botLogic(context);
    });
});

// Start Server (Only in Render)
const PORT = process.env.PORT || 3978;
app.listen(PORT, () => {
    console.log(`✅ Bot is running on Render at port ${PORT}`);
});

