const { TeamsActivityHandler, MessageFactory } = require("botbuilder");

class TeamsBot extends TeamsActivityHandler {
    constructor() {
        super();

        this.onMessage(async (context, next) => {
            const userMessage = context.activity.text.toLowerCase();
            let replyText = "I'm a Support Bot! How can I assist you?";

            if (userMessage.includes("hello")) {
                replyText = "Hello! How can I help you today?";
            } else if (userMessage.includes("help")) {
                replyText = "You can ask me about support services!";
            }

            await context.sendActivity(MessageFactory.text(replyText));
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    await context.sendActivity(
                        MessageFactory.text("Hello! I'm your support bot. Type 'help' to start.")
                    );
                }
            }
            await next();
        });
    }
}

module.exports = TeamsBot;
