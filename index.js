const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
const { BotConfiguration } = require('./config');
const { MyBot } = require('./bot');

// Create server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${server.name} listening to ${server.url}`);
});

// Create adapter
const adapter = new BotFrameworkAdapter({
    appId: BotConfiguration.AppId,
    appPassword: BotConfiguration.AppPassword
});

// Catch-all for errors
adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError]: ${error}`);
    await context.sendActivity('Oops. Something went wrong!');
};

// Create bot
const myBot = new MyBot();

// Listen for incoming requests
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await myBot.run(context);
    });
});
