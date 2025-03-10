// const { BotFrameworkAdapter } = require("botbuilder");
// require("dotenv").config();

// const adapter = new BotFrameworkAdapter({
//     appId: process.env.MICROSOFT_APP_ID,
//     appPassword: process.env.MICROSOFT_APP_PASSWORD
// });

// adapter.onTurnError = async (context, error) => {
//     console.error("Bot error:", error);
//     await context.sendActivity("Oops! Something went wrong.");
// };

// module.exports = { adapter };






const { BotFrameworkAdapter, TurnContext } = require("botbuilder");
require("dotenv").config();

const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID || "",
    appPassword: process.env.MICROSOFT_APP_PASSWORD || ""
});

// Global error handling
adapter.onTurnError = async (context, error) => {
    console.error("❌ Bot error:", error);
    try {
        await context.sendActivity("⚠️ Oops! Something went wrong.");
    } catch (err) {
        console.error("⚠️ Failed to send error message to user:", err);
    }
};

// ✅ Middleware to fix the service URL
adapter.use(async (context, next) => {
    if (context.activity.serviceUrl.includes("localhost")) {
        console.warn("⚠️ Overriding service URL to use remote Render URL.");
        context.activity.serviceUrl = process.env.RENDER_SERVICE_URL || context.activity.serviceUrl;
    }
    await next();
});

module.exports = { adapter };
