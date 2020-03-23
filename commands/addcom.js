module.exports = {
    name: "addcom",
    description: "Allow user to create custom chat commands",
    usage: "-g addcom [command name] | [command output]",
    execute(bot, message, args, db) {
        const divIndex = args.indexOf('|');
        const com_name = args.slice(0, divIndex).join(" ").toLowerCase();
        const com_content = args.slice(divIndex + 1, args.length).join(" ");

        // If user inputted command correctly 
        if (divIndex != -1 && com_name.length > 0 && com_content.length > 0) {
            
            // Check if command exists in commands folder
            const isOfficialCommand = bot.commands.get(com_name);

            // Query for commands in database
            db.query(`SELECT * FROM custom_commands WHERE com_name = '${com_name}'`, (err, rows) => {
                
                // If there is an error
                if (err) {
                    throw err;
                }
                
                // If given command name is already in database or in commands folder
                else if (rows[0] || isOfficialCommand) {
                    message.channel.send("Command already exists.");
                }

                // If given command name is unique
                else {
                    db.query(`INSERT INTO custom_commands (com_name, com_content ) VALUES ('${com_name}', '${com_content}')`);
                    message.channel.send("Command stored.");
                }

            });
        }

        // If user inputted command incorectly
        else {
            console.log("Invalid arguments");
        }
    }
}