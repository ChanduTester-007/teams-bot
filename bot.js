const { ActivityHandler } = require('botbuilder');

class MyBot extends ActivityHandler {
    constructor(conversationState, userState) {
        super();
        this.conversationState = conversationState;
        this.userState = userState;

        this.onMessage(async (context, next) => {
            const txt = context.activity.text.trim().toLowerCase();
            if (txt === 'hello') {
                await context.sendActivity('Hello! How can I assist you today?');
            } else {
                await context.sendActivity(`You said: ${txt}`);
            }
            await next();
        });
    }

    async run(context) {
        await super.run(context);
        await this.conversationState.saveChanges(context, false);
        await this.userState.saveChanges(context, false);
    }
}

module.exports.MyBot = MyBot;
