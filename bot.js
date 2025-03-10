const { ActivityHandler } = require("botbuilder");

class TeamsBot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            if (!context || !context.activity) {
                console.error("Error: Context or activity is undefined");
                return;
            }

            console.log("Bot received message:", context.activity.text);
            await context.sendActivity(`You said: ${context.activity.text}`);

            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    await context.sendActivity("Hello! I'm your Teams bot.");
                }
            }
            await next();
        });
    }
}

module.exports.TeamsBot = TeamsBot;
