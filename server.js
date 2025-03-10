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
const express = require('express');
const { BotFrameworkAdapter } = require('botbuilder');
const { TeamsBot } = require('./bot');
const { TeamsAdapter } = require('./teamsAdapter');

const app = express();
const port = process.env.PORT || 3000;

const adapter = new TeamsAdapter();
const bot = new TeamsBot();

// Middleware for processing bot messages
app.post('/api/messages', async (req, res) => {
    await adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
});

// Health check route
app.get('/', (req, res) => {
    res.send('Teams Ticket Bot is running on Render!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
