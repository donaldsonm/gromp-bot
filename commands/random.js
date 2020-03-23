const Discord = require("discord.js");

module.exports = {
    name: "random",
    description: "Get a random integer from a given range, from 1 to [num] or [num1] to [num2].",
    usage: "-g random [num], -g random [num1] [num2]",
    execute(bot, message, args, db) {
        const embed = new Discord.RichEmbed()
            .setColor("#00CC00");
        
        if (args.length == 1 && !args.some(isNaN) && args[0] > 1) {
            embed.setTitle(`Random - Min: 1, Max: ${args[0]}`);
            embed.setDescription(Math.floor(Math.random() * Math.floor(args[0])) + 1);
            message.channel.send(embed);
        }
        else if (args.length == 2 && !args.some(isNaN) && args[0] <= args[1]) {
            embed.setTitle(`Random - Min: ${args[0]}, Max: ${args[1]}`);
            embed.setDescription(Math.floor(Math.random() * Math.floor(args[1] - args[0] + 1)) + Math.floor(args[0]));
            message.channel.send(embed);
        }
        else {
            console.log("Invalid arguments");
        }
    }
}