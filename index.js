const { BotFrameworkAdapter, MemoryStorage, ConversationState, UserState } = require('botbuilder');
const restify = require('restify');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create server
const server = restify.createServer();
server.listen(process.env.PORT || 3978, () => {
    console.log(`${server.name} listening to ${server.url}`);
});

// Create adapter
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Define state management objects
const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

// Create bot
const bot = require('./bot');

// Listen for incoming requests
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
});

// Catch-all for errors
adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError]: ${error}`);
    await context.sendActivity('Oops. Something went wrong!');
};
