require('dotenv').config();
const restify = require('restify');
const { BotFrameworkAdapter, MemoryStorage, ConversationState, UserState } = require('botbuilder');
const { TeamsBot } = require('./bot');

// Create HTTP server for Render
const server = restify.createServer();
const PORT = process.env.PORT || 10000;  // Render provides a port dynamically
server.listen(PORT, () => {
    console.log(`\nBot is running on port ${PORT}`);
});

// Create adapter for Microsoft Bot Framework
const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Create state storage
const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

// Create bot instance
const bot = new TeamsBot(conversationState, userState);

// Endpoint for Teams messages
server.post('/api/messages', async (req, res) => {
    await adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
});
