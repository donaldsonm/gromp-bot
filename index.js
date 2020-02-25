const fs = require("fs");
const Discord = require("discord.js");
const { token, prefix } = require("./config.js");
const helper = require('../helper.js');

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
    if (!(message.content.startsWith(prefix)) || message.author.bot) {
        return;
    }
    else {
        const args = message.content.slice(prefix.length).split(" ");
        const commandName = args.shift().toLowerCase();
        const command = bot.commands.get(commandName);

        // Check if a command i
        if (!command) {
            console.log("Command does not exist in commands folder");
            return;
        }
        /*
        else if (commandName is in database) {
            // Search database for custom commands
            // If command is not in there then console.log("Command not in database")
            // Attempting to execute ${command.name} command
            if (helper.isURL(text) && helper.isURLImage(text)) {
                message.channel.send({files: [text]});
            }
            else {
                message.channel.send(text);
            }
        }
        */

        else {
            console.log(`Attempting to execute ${command.name} command`);
            command.execute(message, args);
        }
    }
});

bot.on("guildMemberAdd", member => {

    console.log(`${member.user.username} has joined the server.`);

    let role = member.guild.roles.find('name', 'Integrity Abiding Citizens');

    member.addRole(role);
});

bot.login(token);