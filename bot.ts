export class TeamsBot {
    constructor() {
        console.log("Bot initialized");
    }

    async run(context) {
        console.log("Bot is handling message:", context.activity.text);
    }
}
