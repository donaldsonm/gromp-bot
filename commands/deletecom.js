module.exports = {
    name: "deletecom",
    description: "Delete a custom command",
    usage: "-g deletecom [command]",
    execute(bot, message, args, db) {
        console.log(args);
        const com_name = args.join(" ");

        db.query(`SELECT * FROM custom_commands WHERE com_name = '${com_name}'`, (err, rows) => {
                
            // If there is an error
            if (err) {
                throw err;
            }
            
            // If given command name is already in database or in commands folder
            else if (!rows[0]) {
                message.channel.send("Command doesn't exist.");
            }

            // If given command name is unique
            else {
                db.query(`DELETE FROM custom_commands WHERE com_name = '${com_name}'`);
                message.channel.send("Command deleted.");
            }

        });
    }
}