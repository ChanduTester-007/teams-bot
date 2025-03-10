// const { ActivityHandler } = require("botbuilder");

// class TeamsBot extends ActivityHandler {
//     constructor() {
//         super();
//         this.onMessage(async (context, next) => {
//             if (!context || !context.activity) {
//                 console.error("Error: Context or activity is undefined");
//                 return;
//             }

//             console.log("Bot received message:", context.activity.text);
//             await context.sendActivity(`You said: ${context.activity.text}`);

//             await next();
//         });

//         this.onMembersAdded(async (context, next) => {
//             const membersAdded = context.activity.membersAdded;
//             for (let member of membersAdded) {
//                 if (member.id !== context.activity.recipient.id) {
//                     await context.sendActivity("Hello! I'm your Teams bot.");
//                 }
//             }
//             await next();
//         });
//     }
// }

// module.exports.TeamsBot = TeamsBot;

const { TeamsActivityHandler } = require('botbuilder');

class TeamsBot extends TeamsActivityHandler {
    constructor() {
        super();

        this.onMessage(async (context, next) => {
            const text = context.activity.text.toLowerCase();

            if (text.includes('create ticket')) {
                await context.sendActivity('Ticket created successfully 🎟️!');
            } else if (text.includes('assign ticket')) {
                await context.sendActivity('Ticket assigned to a team member ✅!');
            } else {
                await context.sendActivity('Hello! I can help create and assign tickets in Teams.');
            }

            await next();
        });

        this.onMembersAdded(async (context, next) => {
            await context.sendActivity('Welcome to Teams Ticket Bot! Type "create ticket" to start.');
            await next();
        });
    }
}

module.exports.TeamsBot = TeamsBot;
