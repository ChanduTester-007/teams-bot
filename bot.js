const { ActivityHandler } = require('botbuilder');

class MyBot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            const replyText = `Echo: ${context.activity.text}`;
            await context.sendActivity(replyText);
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    await context.sendActivity('Welcome to the bot!');
                }
            }
            await next();
        });
    }
}

module.exports.MyBot = MyBot;
