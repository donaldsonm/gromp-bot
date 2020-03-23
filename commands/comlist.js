const Discord = require("discord.js");

module.exports = {
    name: "comlist",
    description: "View list of custom commands.",
    usage: "-g comlist",
    execute(bot, message, args, db) {
        
        db.query(`SELECT com_name FROM custom_commands`, (err, rows) => {
            
            if (err) {
                throw err;
            }

            else {
                const data = []

                for (let i = 0; i < rows.length; i++) {
                    data.push("-g " + rows[i].com_name);
                }

                const embed = new Discord.RichEmbed()
                    .setColor("#00CC00")
                    .setTitle("Custom Commands")
                    .setDescription(data);
                message.channel.send(embed);
            }
            
        });
        
    }
}