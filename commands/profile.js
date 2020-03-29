const Discord = require("discord.js");
const { Kayn } = require('kayn');
const { riotAPI } = require("../config.js");
const kayn = Kayn(riotAPI)();

module.exports = {
    name: "profile",
    description: "Get the profile of a League of Legends summoner given their region and name.",
    usage: "-g profile [region] [summoner name]",
    async execute(bot, message, args, db) {
        if (args.length >= 2) {
            const region = args[0];
            const summonerName = args.slice(1, args.length).join("").toLowerCase();
            

            try {

                const { id, name, profileIconId, summonerLevel } = await kayn.Summoner.by.name(summonerName).region(region);
                const { v: patch } = await kayn.DDragon.Realm.list(region);
                const image = `https://cdn.communitydragon.org/${patch}/profile-icon/${profileIconId}.jpg`

                const opgg = `https://${region}.op.gg/summoner/userName=${summonerName}`;
                const porofessorgg = `https://porofessor.gg/live/${region}/${summonerName}`;

                const embed = new Discord.RichEmbed()
                    .setColor("#00CC00")
                    .setTitle("Profile")
                    .setThumbnail(image)
                    .setDescription(`Summoner: ${name}\nLevel: ${summonerLevel}`)
                    .addField("Links", `[OP.GG](${opgg}) | [Porofessor.GG](${porofessorgg})`)
                    .setTimestamp();
                
                message.channel.send(embed);
            }
            catch (err) {
                message.channel.send("Invalid region and/or username.");
                throw err;
            }
        }
        else {
            console.log("Invalid arguments");
        }
    }
}