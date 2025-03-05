const { CloudAdapter } = require('botbuilder');
require("dotenv").config();
const express = require("express");
const { BotFrameworkAdapter, MemoryStorage, ConversationState } = require("botbuilder");

const app = express();
const PORT = process.env.PORT || 3978;

// Middleware to parse JSON requests
app.use(express.json());

// Teams Bot Adapter
const adapter = new CloudAdapter({
    appId: process.env.MICROSOFT_APP_ID || "",
    appPassword: process.env.MICROSOFT_APP_PASSWORD || ""
});

// Simple in-memory storage
const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);

// Handle messages
app.post("/api/messages", (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        if (context.activity.type === "message") {
            await context.sendActivity(`You said: ${context.activity.text}`);
        }
    });
});

// Deploy on Render
app.listen(PORT, () => {
    console.log(`✅ Bot is running on port ${PORT}`);
});
