const { BotFrameworkAdapter } = require("botbuilder");
require("dotenv").config();

const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

adapter.onTurnError = async (context, error) => {
    console.error("Bot error:", error);
    await context.sendActivity("Oops! Something went wrong.");
};

module.exports = { adapter };
