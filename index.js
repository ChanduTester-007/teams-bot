require("dotenv").config();
const restify = require("restify");
const { BotFrameworkAdapter } = require("botbuilder");
const SupportBot = require("./bot");

const adapter = new BotFrameworkAdapter({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD,
});

const bot = new SupportBot();

const server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.post("/api/messages", async (req, res) => {
  await adapter.processActivity(req, res, async (context) => {
    await bot.run(context);
  });
});

server.listen(process.env.PORT || 3978, () => {
  console.log(`🚀 Bot is running on http://localhost:${process.env.PORT || 3978}`);
});
