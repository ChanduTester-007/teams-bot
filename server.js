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


require("dotenv").config();
const express = require("express");
const { BotFrameworkAdapter } = require("botbuilder");

const app = express();
const PORT = process.env.PORT || 10000;

// 🔹 Create Bot Adapter (Ensure Microsoft App ID & Password are set)
const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Middleware to parse JSON requests
app.use(express.json());

// 🔹 Bot Message Handling
app.post("/api/messages", async (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        if (context.activity.type === "message") {
            await context.sendActivity({
                text: `Hello! Your bot is working.`,
                serviceUrl: context.activity.serviceUrl || "https://teams-bot-v2ak.onrender.com/api/messages"
            });
        } else {
            await context.sendActivity(`[${context.activity.type} event detected]`);
        }
    });
});

// Health check endpoint
app.get("/", (req, res) => {
    res.send("✅ Teams bot is live on Render!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

