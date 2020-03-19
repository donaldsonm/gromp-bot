module.exports = {
    name: "deletecom",
    description: "Delete a custom command",
    usage: "-g deletecom [command]",
    execute(bot, message, args, db) {

        const com_name = args.join(" ");

        db.query(`SELECT * FROM custom_commands WHERE com_name = '${com_name}'`, (err, rows) => {
                
            const isOfficialCommand = bot.commands.get(com_name);

            // If there is an error
            if (err) {
                throw err;
            }
            
            else if (isOfficialCommand) {
                message.channel.send("Command cannot be deleted.");
            }

            // If given command name isn't in database
            else if (!rows[0]) {
                message.channel.send("Command does not exist.");
            }

            // If given command name is unique
            else {
                db.query(`DELETE FROM custom_commands WHERE com_name = '${com_name}'`);
                message.channel.send("Command deleted.");
            }

        });
    }
}