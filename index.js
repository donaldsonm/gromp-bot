const fs = require("fs");
const Discord = require("discord.js");
const { token, prefix, dbName, dbUser, dbPass } = require("./config.js");
const helper = require('./helper.js');
const mysql = require("mysql");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

let db = mysql.createConnection({
    host: "localhost",
    user: dbUser,
    password: dbPass,
    database: dbName
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to database.");
});

bot.once("ready", () => {
    console.log(`${bot.user.tag} is now active in ${bot.guilds.size} server(s).`);
    bot.user.setActivity("-g help");
});

bot.on("message", message => {

    if (!(message.content.startsWith(prefix)) || message.author.bot) {
        return;
    }

    else {
        const arrayArgs = message.content.slice(prefix.length).split(" ");
        const stringArgs = message.content.slice(prefix.length);
        const commandName = arrayArgs.shift().toLowerCase();
        const command = bot.commands.get(commandName);

        if (command) {
            console.log(`Attempting to execute "${command.name}" command from commands folder.`);
            command.execute(bot, message, arrayArgs, db);
        }

        else {
            db.query(`SELECT com_content FROM custom_commands WHERE com_name = '${stringArgs}'`, (err, rows) => {
                if (err) {
                    throw err;
                }

                else if (!rows[0]) {
                    console.log("Command does not exist.");
                }
                
                else {
                    console.log(`Attempting to execute "${stringArgs}" command from database.`);
                    const text = rows[0].com_content;

                    if (helper.isURL(text) && helper.isURLImage(text)) {
                        message.channel.send({files: [text]});
                    }
                    else {
                        message.channel.send(text);
                    }
                }
            });
        }
    }
});

bot.on("guildMemberAdd", member => {

    console.log(`${member.user.username} has joined the server.`);

    let role = member.guild.roles.find('name', 'Integrity Abiding Citizens');

    member.addRole(role);
});

bot.login(token);