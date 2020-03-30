const Discord = require("discord.js");
const { Kayn } = require("kayn");
const { riotAPI } = require("../config.js");
const kayn = Kayn(riotAPI)();

module.exports = {
    name: "profile",
    description: "Get the profile of a League of Legends summoner given their \
        region and name.",
    usage: "-g profile [region] [summoner name]",
    async execute(bot, message, args, db) {
        if (args.length >= 2) {
            const region = args[0].toLowerCase();
            const summonerName = args.slice(1, 
                args.length).join("").toLowerCase();
            
            try {

                // Grab basic profile info 
                const { id, accountId, name, profileIconId, summonerLevel } = await 
                    kayn.Summoner.by.name(summonerName).region(region);
                
                // Get current patch number
                const { v: patch } = await kayn.DDragon.Realm.list(region);
                
                // Get their profile image
                const profileImage = 
                    `https://cdn.communitydragon.org/${patch}/profile-icon/${profileIconId}.jpg`
                
                // Grabs ranked stats from solo and flex queue
                const rankArray = await kayn.League.Entries.by.summonerID(id);
                let soloRank = "Unranked";
                let flexRank = "Unranked";
                let soloLP;
                let soloWins;
                let soloLosses;
                let flexLP;
                let flexWins;
                let flexLosses;

                for (let i = 0; i < rankArray.length; i++) {
                    if (rankArray[i]["queueType"] == "RANKED_SOLO_5x5") {
                        soloRank = rankArray[i]["tier"];
                        soloRank = soloRank.charAt(0) + 
                            soloRank.substring(1).toLowerCase() + 
                            " " + rankArray[i]["rank"];
                        soloLP = rankArray[i]["leaguePoints"];
                        soloWins = rankArray[i]["wins"];
                        soloLosses = rankArray[i]["losses"];
                    }
                    if (rankArray[i]["queueType"] == "RANKED_FLEX_SR") {
                        flexRank = rankArray[i]["tier"];
                        flexRank = flexRank.charAt(0) + 
                            flexRank.substring(1).toLowerCase() + 
                            " " + rankArray[i]["rank"];
                        flexLP = rankArray[i]["leaguePoints"];
                        flexWins = rankArray[i]["wins"];
                        flexLosses = rankArray[i]["losses"];
                    }
                }

                // Build complete message that will be displayed for rank
                let rankMessage = `Solo Queue: ${soloRank}\n`;
                if (soloRank != "Unranked") {
                    
                    const winrate = Math.round(100 * 
                        (soloWins/(soloWins + soloLosses)));
                    rankMessage += `W/L: ${soloWins}/${soloLosses} - \
                        LP: ${soloLP}\n \
                        Winrate: ${winrate}%\n`;
                }

                rankMessage += `\nFlex Queue: ${flexRank}\n`;

                if (flexRank != "Unranked") {

                    const winrate = Math.round(100 * 
                        (flexWins/(flexWins + flexLosses)));
                    rankMessage += `W/L: ${flexWins}/${flexLosses} - \
                        LP: ${flexLP}\n \
                        Winrate: ${winrate}%\n`;
                }

                const champ = await kayn.DDragon.Champion.get("Kled");
                console.log(champ);

                // Links for the end of profile
                const opgg = 
                    `https://${region}.op.gg/summoner/userName=${summonerName}`;
                const porofessorgg = 
                    `https://porofessor.gg/live/${region}/${summonerName}`;

                const embed = new Discord.RichEmbed()
                    .setColor("#00CC00")
                    .setTitle("Profile")
                    .setThumbnail(profileImage)
                    .setDescription(`Summoner: ${name}\n \
                    Region: ${region.toUpperCase()}\n \
                    Level: ${summonerLevel}`);

                embed.addField("Ranks", rankMessage, true);

                embed.addField("Recent Games", "Placeholder", true);

                embed.addField("Links", `[OP.GG](${opgg}) | \
                    [Porofessor.GG](${porofessorgg})`);

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