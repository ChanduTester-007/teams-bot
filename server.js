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


const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const { TeamsBot } = require("./bot");
const { adapter } = require("./teamsAdapter");

const app = express();
const PORT = process.env.PORT || 3000; // Render assigns this dynamically

app.use(bodyParser.json());

const bot = new TeamsBot();

app.post("/api/messages", async (req, res) => {
    console.log("Incoming request:", req.body);

    if (!req.body) {
        return res.status(400).send("Bad Request: No body received");
    }

    await adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
});

// Render requires 0.0.0.0 for proper hosting
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Bot is running on port ${PORT}`);
});
