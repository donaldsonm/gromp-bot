module.exports = {
    name: "help",
    description: "List of commands or details about a command",
    usage: "-g help OR -g help [command]",
    execute(message, args) {
        const data = [];
        const { commands } = message.client;
        
        // See list of commands
        if (!args.length) {
            data.push("List of commands:");
            data.push(commands.map(command => "-g " + command.name).join('\n'));
            data.push("Use '-g help [command]' to get info on a specific command.");
            message.channel.send(data);
        }

        // See details of a specific command
        else {
            const commandName = args[0].toLowerCase();
            const command = commands.get(commandName);
            
            if (!command) {
                return message.reply("Invalid command");
            }
            else {
                data.push(`Name: ${command.name}`);
                if (command.aliases)
                    data.push(`Aliases: ${command.aliases}`);
                if (command.description)
                    data.push(`Description: ${command.description}`);
                if (command.usage)
                    data.push(`Usage: ${command.usage}`);
                message.channel.send(data);
            }
        }
    }
}