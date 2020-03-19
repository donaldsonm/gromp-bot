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

                data.push("List of custom commands:")
                for (let i = 0; i < rows.length; i++) {
                    data.push("-g " + rows[i].com_name);
                }

                message.channel.send(data);
            }
        });
        
    }
}