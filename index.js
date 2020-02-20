const fs = require("fs");
const Discord = require("discord.js");
const config = require("./config.json");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.once("ready", () => {
    console.log(`${bot.user.tag} is now active in ${bot.guilds.size} server(s).`)
});

bot.on("message", message => {
    if (!(message.content.startsWith(config.prefix[0]) || message.content.startsWith(config.prefix[1])) || message.author.bot) {
        return;
    }
    else {
        let prefix;
        if (message.content.startsWith(config.prefix[0])) {
            prefix = config.prefix[0];
        }
        else {
            prefix = config.prefix[1];
        }
        const args = message.content.slice(prefix.length).split(" ");
        const commandName = args.shift().toLowerCase();
        const command = bot.commands.get(commandName);

        if (!command) {
            console.log("Command does not exist");
            return;
        }
        else {
            console.log(`Attempting to execute ${command.name} command`);
            command.execute(message, args);
        }
    }
})

bot.login(config.token);