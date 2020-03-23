const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "List of commands or details about a command",
    usage: "-g help OR -g help [command]",
    execute(bot, message, args, db) {
        const data = [];
        const { commands } = message.client;
        
        // See list of commands
        if (!args.length) {
            data.push(commands.map(command => "-g " + command.name).join('\n'));
            data.push("Use '-g help [command]' to get info on a specific command.");
            
            const embed = new Discord.RichEmbed()
                .setColor("#00CC00")
                .setTitle("List of commands")
                .setDescription(data);
            message.channel.send(embed);
        }

        // See details of a specific command
        else {
            const commandName = args[0].toLowerCase();
            const command = commands.get(commandName);
            
            if (!command) {
                return message.reply("Invalid command");
            }
            else {
                if (command.aliases)
                    data.push(`Aliases: ${command.aliases}`);
                if (command.description)
                    data.push(`Description: ${command.description}`);
                if (command.usage)
                    data.push(`Usage: ${command.usage}`);

                const embed = new Discord.RichEmbed()
                    .setColor("#00CC00")
                    .setTitle(`Name: ${command.name}`)
                    .setDescription(data);
                message.channel.send(embed);
            }
        }
    }
}