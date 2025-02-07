const { ActivityHandler } = require('botbuilder');

class MyBot extends ActivityHandler {
    constructor(conversationState, userState) {
        super();
        this.conversationState = conversationState;
        this.userState = userState;

        this.onMessage(async (context, next) => {
            await context.sendActivity(`You said: ${context.activity.text}`);
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
